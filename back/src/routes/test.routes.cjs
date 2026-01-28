const express = require("express");
const router = express.Router();

const SelectAttribute = require("../models/Attributes/selectAttribute.cjs");
const NumericalAttribute = require("../models/Attributes/numericalAttribute.cjs");
const BinaryAttribute = require("../models/Attributes/binaryAttribute.cjs");

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

// Create a new Numerical Attribute
router.post("/numerical-attribute", async (req, res) => {
    try {
        const attr = new NumericalAttribute({
            ...req.body,
        });

        const savedAttr = await attr.save();
        res.status(201).json(savedAttr);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new binary Attribute
router.post("/binary-attribute", async (req, res) => {
    try {
        const attr = new BinaryAttribute({
            ...req.body,
        });

        const savedAttr = await attr.save();
        res.status(201).json(savedAttr);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new item
router.post("/item", async (req, res) => {
    try {
        // Check if request body is an array (for root item with children)
        if (Array.isArray(req.body)) {
            let rootItem = null;
            let children = Array();

            // Check if root item is present with separate children
            for (const itemData of req.body) {
                if (itemData.isRoot === false || !itemData.isRoot) {
                    children.push(itemData);
                } else {
                    rootItem = itemData;
                }
            }

            // If root item is not present, return error
            if (rootItem === null) {
                return res.status(500).json({ error: "Root item is required" });
            }

            // Save all child items first
            let saved = Array();
            for (const childData of children) {
                const item = new Item({
                    name: childData.name,
                    description: childData?.description,
                    attributes: childData?.attributes,
                    isPacked: childData?.isPacked,
                    hasParent: true,
                });
                const savedItem = await item.save();
                saved.push(savedItem);
            }

            // Now save the root item with references to child items
            let childrenIds = saved.map((i) => i._id);
            const item = new Item({
                name: rootItem.name,
                description: rootItem?.description,
                attributes: rootItem?.attributes,
                isPacked: rootItem?.isPacked,
                hasParent: false,
                subItems: childrenIds,
            });

            const savedItem = await item.save();
            return res.status(201).json(savedItem);
        }
        // Single item creation
        else {
            // If trying to create a child item alone, return error
            if (req.body.hasParent === true) {
                res.status(500).json({ error: "Child items cannot be created alone" });
            }

            // Create and save the item
            const item = new Item({
                name: req.body.name,
                description: req.body?.description,
                attributes: req.body?.attributes,
                isPacked: req.body?.isPacked,
                hasParent: false,
            });
            const savedItem = await item.save();
            return res.status(201).json(savedItem);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
