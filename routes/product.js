const express = require('express');
const router = express.Router();



// CRUD controllers
const { createProduct, createProductWithImageUploadToS3 } = require('../controllers/product/create');
const { getProductsByQuery, getProductById, getProductByAuthorId } = require('../controllers/product/read');
const { updateProduct, addImage, removeImage } = require('../controllers/product/update');
const { deleteProductById, deleteProductByAuthorId } = require('../controllers/product/delete');

// CRUD routes

// *Create*
router.post('/products', createProduct);
router.post('/createProductWithImageUploadToS3', createProductWithImageUploadToS3);

// *Read*
router.get('/products', getProductsByQuery);
router.get('/products/:productId', getProductById);
router.get('/products/getProductByAuthorId/:authorId', getProductByAuthorId);

// *Update*
router.put('/products/:productId', updateProduct);
router.put('/products/:productId/image', addImage);
router.put('/products/:productId/deleteImage', removeImage);

// *Delete*
router.delete('/products/', deleteProductByAuthorId);
router.delete('/products/:productId', deleteProductById);

module.exports = router;