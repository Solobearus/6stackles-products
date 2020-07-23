const Product = require('../../models/product');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3')

const s3 = new aws.S3({
    apiVersion: '2006-03-01',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const uploadS3 = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: process.env.S3_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, `${Date.now().toString()}.jpg`)
        }
    })
})




exports.updateProduct = (req, res) => {
    const allowedFields = [
        'name',
        'description',
        'price',
        'images',
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




exports.updateProductWithImageUploadToS3 = async (req, res) => {

    uploadS3.array('photo', 4)(req, res, (error) => {
        // console.log('files', req.files);
        if (error) {
            console.log('errors', error);
            res.status(500).json({
                err: error
            });
        } else {
            // If File not found
            if (req.files === undefined) {
                console.log('uploadProductsImages Error: No File Selected!');
                res.status(500).json({
                    err: 'Error: No File Selected',
                });
            } else {
                // If Success
                let fileArray = req.files;
                console.log('req.body._id');
                console.log(req.body._id);
                Product.findOne({ _id: req.body._id })
                    .then(product => {
                        const images = [null, null, null, null];
                        for (let i = 0; i < fileArray.length; i++) {
                            images[i] = fileArray[i].key;
                        }
                        console.log('images');
                        console.log(images);
                        
                        product.images = images;
                        console.log('product');
                        console.log(product);

                        product.save((err) => {
                            if (err) {
                                return res.status(500).send(err);
                                //TODO: implement deleting files if update failed
                            }
                            res.status(200).send({ msg: 'Product updated successfully.', product });
                        });
                    })
                    .catch(err => res.status(500).json({ err: 'This product does not belong to your userID.' }));
                    //TODO: implement deleting files if update failed
            }
        }
    })
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
