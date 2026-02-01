const express = require("express");
const router = express.Router();

const SelectAttribute = require("../models/Attributes/selectAttribute.cjs");
const NumericalAttribute = require("../models/Attributes/numericalAttribute.cjs");
const BinaryAttribute = require("../models/Attributes/binaryAttribute.cjs");
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

router.get("/attributes", async (_req, res) => {
    try {
        const attrs = await Attribute.find({}, { createdAt: 0, updatedAt: 0 })
            .populate("requires")
            .exec();
        res.status(200).json(attrs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/attributes/:id", async (req, res) => {
    try {
        const attr = await Attribute.find(
            { _id: req.params.id },
            { createdAt: 0, updatedAt: 0 },
        )
            .populate("requires")
            .exec();
        if (!attr) {
            return res.status(404).json({ error: "Select Attribute not found" });
        }
        res.status(200).json(attr);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/items", async (_req, res) => {
    try {
        const items = await Item.find(
            { hasParent: false },
            { createdAt: 0, updatedAt: 0 },
        )
            .populate({ path: "attributes", populate: { path: "requires" } })
            .populate({
                path: "subItems",
                populate: { path: "attributes", populate: { path: "requires" } },
            })
            .exec();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/items/:id", async (req, res) => {
    try {
        const item = await Item.find(
            { _id: req.params.id, hasParent: false },
            { createdAt: 0, updatedAt: 0 },
        )
            .populate({ path: "attributes", populate: { path: "requires" } })
            .populate({
                path: "subItems",
                populate: { path: "attributes", populate: { path: "requires" } },
            })
            .exec();
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
