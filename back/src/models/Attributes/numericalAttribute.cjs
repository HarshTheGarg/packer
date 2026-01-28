const mongoose = require("mongoose");
const Attribute = require("./attribute.cjs");

const numericalAttributeSchema = new mongoose.Schema({
    min: { type: Number, required: false, default: 0 },
    max: { type: Number, required: false, default: 100 },
    unit: { type: String, required: false, default: "Nos" },
});

numericalAttributeSchema.pre("validate", function() {
    if (this.min !== undefined && this.max !== undefined && this.min > this.max) {
        return new Error(
            `Minimum value ${this.min} cannot be greater than maximum value ${this.max}`,
        );
    }
});

const NumericalAttribute = Attribute.discriminator(
    "NumericalAttribute",
    numericalAttributeSchema,
);

module.exports = NumericalAttribute;
