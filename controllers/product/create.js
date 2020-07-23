const Product = require('../../models/product');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3')


console.log('process.env.AWS_ACCESS_KEY_ID');
console.log(process.env.AWS_ACCESS_KEY_ID);

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


exports.createProduct = async (req, res) => {
    const {
        name,
        description,
        price,
        condition,
        category,
        location,
        images,
        userId: author
    } = req.body;

    const params = {
        name,
        description,
        price,
        condition,
        category,
        images,
        location,
        author
    }

    const product = new Product(params);

    product.save((err, user) => {
        if (err) {
            return res.status(400).json({ err });
        }

        res.status(201).json({ msg: 'Product created successfully', _id: user._id });
    });
};

exports.createProductWithImageUploadToS3 = async (req, res) => {


    const {
        name,
        description,
        price,
        condition,
        category,
        location,
        images,
        userId: author
    } = req.body;

    const params = {
        name,
        description,
        price,
        condition,
        category,
        images,
        location,
        author
    }

    uploadS3.array('photo', 4)(req, res, (error) => {
        console.log('files', req.files);
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
                let fileArray = req.files,
                    fileLocation;
                const images = [];
                for (let i = 0; i < fileArray.length; i++) {
                    fileLocation = fileArray[i].location;
                    console.log('filenm', fileLocation);
                    images.push(fileLocation)
                }
                // Save the file name into database
                return res.status(200).json({
                    status: 'ok',
                    filesArray: fileArray,
                    locationArray: images
                });
            }
        }
    })
    // res.json({ res: 'is okay' })

    // const s3 = new aws.S3();
    // const fileName = req.query['file-name'];
    // const fileType = req.query['file-type'];
    // const s3Params = {
    //     Bucket: S3_BUCKET,
    //     Key: fileName,
    //     Expires: 60,
    //     ContentType: fileType,
    //     ACL: 'public-read'
    // };

    // s3.getSignedUrl('putObject', s3Params, (err, data) => {
    //     if (err) {
    //         console.log(err);
    //         return res.end();
    //     }
    //     const returnData = {
    //         signedRequest: data,
    //         url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    //     };
    //     res.write(JSON.stringify(returnData));
    //     res.end();
    // });
    // res.

    // const product = new Product(params);

    // product.save((err, user) => {
    //     if (err) {
    //         return res.status(400).json({ err });
    //     }

    //     res.status(201).json({ msg: 'Product created successfully', _id: user._id });
    // });
};