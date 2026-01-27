const mongoose = require('mongoose');

const itemAttributeSchema = new mongoose.Schema({
    attribute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attribute',
        required: true,
    },
    value: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    }
});

module.exports = itemAttributeSchema;
