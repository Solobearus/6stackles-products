const Category = require('../models/category');

exports.deleteCategoryById = (req, res) => {
    const { categoryId } = req.params;
    Category.findByIdAndRemove({ _id: categoryId })
        .then(result => {
            result ?
                res.status(200).send({ msg: 'Category deleted successfully.' }) :
                res.status(500).send({ err: 'No categories found using this ID.' });
        })
        .catch(err => res.status(500).send(err));
};