const Product = require('../../models/product');

exports.createProduct = (req, res) => {
    const product = new Product(req.body);
    
    product.save((err, user) => {
        if (err) {
            return res.status(400).json({ err });
        }
        res.status(201).json({ msg: 'Product created successfully' });
    });
};