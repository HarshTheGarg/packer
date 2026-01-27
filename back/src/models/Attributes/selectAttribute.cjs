const mongoose = require("mongoose");
const Attribute = require("./attribute.cjs");

const selectAttributeSchema = new mongoose.Schema({
    options: {
        type: [String],
        required: true,
        validate: {
            validator: function(v) {
                return v.length > 0;
            },
            message: () => `Options must contain at least one option`,
        },
    },
    allowMultiple: {
        type: Boolean,
        default: false,
        required: false,
    },
});

const SelectAttribute = Attribute.discriminator(
    "SelectAttribute",
    selectAttributeSchema,
);

module.exports = SelectAttribute;
