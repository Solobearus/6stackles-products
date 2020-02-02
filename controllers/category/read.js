const Category = require('../../models/category');

exports.getAllCategories = async (req, res) => {

    const categories = await Category.find({});
    if (!categories) {
        return res.status(400).json({
            error: 'There aren\'t any categories in the database.'
        });
    }
    return res.json(categories);
}

exports.getCategoryById = (req, res) => {
    const { categoryId } = req.params;

    Category.findOne({ _id: categoryId }, (err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: 'Category does not exist.'
            });
        }
        return res.json(category);
    });
};