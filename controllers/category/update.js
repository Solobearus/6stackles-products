const Category = require('../models/category');

exports.updateCategory = (req, res) => {
    const allowedFields = [
        'name',
    ];

    const fieldsToUpdate = {};

    Object.keys(req.body).forEach(key => {
        if (allowedFields.includes(key)) {
            fieldsToUpdate[key] = req.body[key];
        }
    });

    Category.findOne({ _id: req.params.categoryId })
        .then(category => {
            Object.keys(fieldsToUpdate).forEach(key => {
                category[key] = fieldsToUpdate[key];
            });
            category.save((err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.status(200).send({ msg: 'Category updated successfully.' });
            });
        })
};
