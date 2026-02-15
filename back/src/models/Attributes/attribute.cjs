const mongoose = require("mongoose");

const attributeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: false },
    },
    { discriminatorKey: "type", timestamps: true },
);

const Attribute = mongoose.model("Attribute", attributeSchema);

module.exports = Attribute;
