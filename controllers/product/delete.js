const Product = require('../models/product');

exports.deleteProductById = (req, res) => {
    const { productId } = req.params;
    Product.findByIdAndRemove({ _id: productId })
        .then(result => {
            result ?
                res.status(200).send({ msg: 'Product deleted successfully.' }) :
                res.status(500).send({ err: 'No products found using this ID.' });
        })
        .catch(err => res.status(500).send(err));
};

exports.deleteProductByAuthorId = (req, res) => {
    const { authorId } = req.params;
    Product.deleteMany({ author: authorId })
        .then(result => {
            result ?
                res.status(200).send({ msg: 'Products deleted successfully.' }) :
                res.status(500).send({ err: 'This user hasn\'t created any products.' });
        })
        .catch(err => res.status(500).send(err));
};