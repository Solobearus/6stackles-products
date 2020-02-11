const Product = require('../../models/product');

exports.createProduct = async (req, res) => {

    
    const {
        name,
        description,
        price,
        condition,
        category,
        location,
        userId: author
    } = req.body;

    const params = {
        name,
        description,
        price,
        condition,
        category,
        location,
        author
    }

    const product = new Product(params);

    product.save((err, user) => {
        if (err) {
            return res.status(400).json({ err });
        }
        res.status(201).json({ msg: 'Product created successfully' });
    });
};