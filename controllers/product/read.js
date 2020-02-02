const Category = require('../../models/category');

exports.getAllProducts = async (req, res) => {
    const products = await Product.find({});
    if (!products) {
        return res.status(400).json({
            error: 'There aren\'t any products in the database.'
        });
    }
    return res.json(products);
}

exports.getProductById = (req, res) => {
    const { productID } = req.params;

    Product.findOne({ _id: productID }, (err, product) => {
        if (err || !product) {
            return res.status(400).json({
                error: 'Product does not exist'
            });
        }
        return res.json(product);
    });
};

exports.getProductsByCategoryId = (req, res) => {
    const { categoryId } = req.params;
    const { skip, limit } = req.query;

    const query = Product.findOne({ category: categoryId });

    // Chain skip
    if (skip != undefined)             // purely since 0 is "falsey"
      query = query.skip(parseInt(skip));

    // Chain limit
    if (limit != undefined)
      query = query.limit(parseInt(limit));

    query.exec((err, products) => {
        if (err || !products) {
            return res.status(400).json({
                error: 'This category currently does not contain any products.'
            });
        }
        return res.json(products);
    });
};