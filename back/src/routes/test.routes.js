const express = require("express");
const router = express.Router();

const SelectAttribute = require("../models/Attributes/selectAttribute");
const BinaryAttribute = require("../models/Attributes/binaryAttribute");
const NumericalAttribute = require("../models/Attributes/numericalAttribute");
const Attribute = require("../models/Attributes/attribute");
const Item = require("../models/item");

// Create a new Select Attribute
router.post("/select-attributes", async (req, res) => {
  try {
    const attr = new SelectAttribute({
      name: req.body.name,
      options: req.body.options,
      allowMultiple: req.body.allowMultiple,
    });
    const savedAttr = await attr.save();
    res.status(201).json(savedAttr);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
