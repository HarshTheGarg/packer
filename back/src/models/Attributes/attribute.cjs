const mongoose = require("mongoose");

const attributeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    requires: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attribute" }],
  },
  { discriminatorKey: "type", timestamps: true },
);

const Attribute = mongoose.model("Attribute", attributeSchema);

module.exports = Attribute;
