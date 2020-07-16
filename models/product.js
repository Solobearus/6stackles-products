const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        condition: {
            type: String,
            enum: ['New', 'Good', 'Decent', 'Damaged'],
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        category: {
            type: String,
            ref: 'Category',
            required: true,
        },
        images: {
            type: Array,
            default: [],
        },
        location: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);


module.exports = mongoose.model('Product', productSchema);