const Category = require('../models/category');

exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    
    category.save((err, user) => {
        if (err) {
            return res.status(400).json({ err });
        }
        res.status(201).json({ msg: 'Category created successfully' });
    });
};