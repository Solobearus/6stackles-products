const Product = require('../../models/product');

exports.updateProduct = (req, res) => {
    const allowedFields = [
        'name',
        'description',
        'price',
        'condition',
        'category',
        'location'
    ];

    const fieldsToUpdate = {};

    Object.keys(req.body).forEach(key => {
        if (allowedFields.includes(key)) {
            fieldsToUpdate[key] = req.body[key];
        }
    });

    Product.findOne({ _id: req.params.productId, author: req.body.userId })
        .then(product => {
            Object.keys(fieldsToUpdate).forEach(key => {
                product[key] = fieldsToUpdate[key];
            });
            product.save((err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.status(200).send({ msg: 'Product updated successfully.' });
            });
        })
        .catch(err => res.status(500).json({ err: 'This product does not belong to your userID.' }));

};

exports.addImage = (req, res) => {
    
    Product.findOne({ _id: req.params.productId, author: req.body.userId })
        .then(product => {

            product.images.push(req.body.image);

            product.save((err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.status(200).send({ msg: 'Product updated successfully.' });
            });
        })
        .catch(err => res.status(500).json({ err: 'This product does not belong to your userID.' }));
};

exports.removeImage = (req, res) => {
    Product.findOne({ _id: req.params.productId, author: req.body.userId })
        .then(product => {

            product.images.splice(product.images.indexOf(req.body.image), 1);

            product.save((err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.status(200).send({ msg: 'Product updated successfully.' });
            });
        })
        .catch(err => res.status(500).json({ err: 'This product does not belong to your userID.' }));
};
