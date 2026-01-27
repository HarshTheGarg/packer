const mongoose = require("mongoose");
const Attribute = require("./attribute.cjs");

const binaryAttributeSchema = new mongoose.Schema({
    truthyLabel: { type: String, default: "Yes", required: false },
    falsyLabel: { type: String, default: "No", required: false },
});

const BinaryAttribute = Attribute.discriminator(
    "BinaryAttribute",
    binaryAttributeSchema,
);

module.exports = BinaryAttribute;
