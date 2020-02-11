const Product = require('../../models/product');

exports.deleteProductById = (req, res) => {
    const { productId, userId } = req.params;

    Product.findByIdAndRemove({ _id: productId, author: userId })
        .then(result => {
            result ?
                res.status(200).json({ msg: 'Product deleted successfully.' }) :
                res.status(500).json({ err: 'No products found using this ID.' });
        })
        .catch(err => res.status(500).json({ err: 'No products found using this ID.' }));
};

exports.deleteProductByAuthorId = (req, res) => {
    const { userId } = req.params;
    Product.deleteMany({ author: userId })
        .then(result => {
            result ?
                res.status(200).json({ msg: 'Products deleted successfully.' }) :
                res.status(500).json({ err: 'This user hasn\'t created any products.' });
        })
        .catch(err => res.status(500).json({ err: 'No products found using this AuthorId.' }));
};