const mongoose = require("mongoose");
const Attribute = require("./Attributes/attribute.cjs");
const ItemAttributeSchema = require("./itemAttribute.cjs");

const itemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        attributes: {
            type: [ItemAttributeSchema],
            default: [],
        },
        subItems: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
            default: [],
        },
        isPacked: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
    { timestamps: true },
);

itemSchema.pre("validate", async function() {
    try {
        // If there are no attributes, skip validation
        if (!this.attributes || this.attributes.length === 0) {
            return;
        }

        // Check for duplicate attributes
        const ids = this.attributes.map((attr) => attr.attribute.toString());

        if (ids.length !== new Set(ids).size) {
            return new Error("Duplicate attributes found in item's attributes array");
        }

        // Fetch all referenced attributes
        const attributeIds = [...new Set(ids)];
        const attributes = await Attribute.find({
            _id: { $in: attributeIds },
        }).lean();

        // Map attributes by their IDs for easy lookup
        const attributeMap = new Map(
            attributes.map((attr) => [attr._id.toString(), attr]),
        );

        // Validate each attribute entry
        for (const entry of this.attributes) {
            const attribute = attributeMap.get(entry.attribute.toString());

            // If the attribute does not exist
            if (!attribute) {
                return new Error(`Attribute with ID ${entry.attribute} does not exist`);
            }

            // Check if the entry has requires array defined, and the attributes defined in it are present in the item's attributes
            if (attribute.requires && attribute.requires.length > 0) {
                for (const reqAttrId of attribute.requires) {
                    if (!ids.has(reqAttrId.toString())) {
                        return new Error(
                            `Attribute ${attribute.name} requires attribute with ID ${reqAttrId} to be present`,
                        );
                    }
                }
            }

            // Validate based on attribute type
            switch (attribute.type) {
                case "NumberAttribute": {
                    // Check if the value is a number
                    if (typeof entry.value !== "number") {
                        return new Error(
                            `Value for attribute ${attribute.name} must be a number`,
                        );
                    }

                    // Check min and max constraints
                    if (
                        (attribute.min !== undefined && entry.value < attribute.min) ||
                        (attribute.max !== undefined && entry.value > attribute.max)
                    ) {
                        return new Error(
                            `Value for attribute ${attribute.name} must be between ${attribute.min} and ${attribute.max}`,
                        );
                    }

                    break;
                }

                case "BinaryAttribute": {
                    // Check if the value is a boolean
                    if (typeof entry.value !== "boolean") {
                        return new Error(
                            `Value for attribute ${attribute.name} must be a boolean`,
                        );
                    }
                    break;
                }

                case "SelectAttribute": {
                    const values = Array.isArray(entry.value)
                        ? entry.value
                        : [entry.value];

                    // Ensure options are defined
                    if (
                        attribute.options === undefined ||
                        attribute.options.length === 0
                    ) {
                        return new Error(
                            `Attribute ${attribute.name} has no options defined`,
                        );
                    }

                    // Check if multiple selections are allowed
                    if (!attribute.allowMultiple && values.length > 1) {
                        return new Error(
                            `Attribute ${attribute.name} does not allow multiple selections`,
                        );
                    }

                    // Validate each selected value
                    for (const val of values) {
                        if (!attribute.options.includes(val)) {
                            return new Error(
                                `Value ${val} for attribute ${attribute.name} is not a valid option`,
                            );
                        }
                    }

                    break;
                }
                default: {
                    // Unknown attribute type
                    return new Error(`Unknown attribute type ${attribute.type}`);
                }
            }
        }
    } catch (err) {
        return err;
    }
});

module.exports = mongoose.model("Item", itemSchema);
