const Product = require('../../models/product');

exports.getProductsByQuery = async (req, res) => {
    const { name, category, price, location, condition } = params = req.query;
    const query = await getQueryFromParams(params);
    const products = await Product.find(query);

    if (!products) {
        return res.status(400).json({
            error: 'There aren\'t any products in the database.'
        });
    }
    return res.json(products);
}

exports.getProductById = (req, res) => {
    const { productId } = req.params;

    Product.findOne({ _id: productId }, (err, product) => {
        if (err || !product) {
            return res.status(400).json({
                error: 'Product does not exist'
            });
        }
        return res.json(product);
    });
};

exports.getProductByAuthorId = (req, res) => {
    const { authorId } = req.params;

    Product.find({ author: authorId }, (err, product) => {
        if (err || !product) {
            return res.status(400).json({
                error: 'Products with this AuthorId does not exist'
            });
        }
        return res.json(product);
    });
};


getQueryFromParams = async (params) => {
    let query;
    if (Object.entries(params).length !== 0) {
        query = {
            $and: [

            ]
        }
        for (let key in params) {
            if (key) {
                await query.$and.push({ [key]: params[key] });
            }
        }
        return query;
    }
    return {};
}




