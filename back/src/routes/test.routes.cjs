const express = require("express");
const router = express.Router();

const SelectAttribute = require("../models/Attributes/selectAttribute.cjs");
const BinaryAttribute = require("../models/Attributes/binaryAttribute.cjs");
const NumericalAttribute = require("../models/Attributes/numericalAttribute.cjs");
const Attribute = require("../models/Attributes/attribute.cjs");
const Item = require("../models/item.cjs");

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
