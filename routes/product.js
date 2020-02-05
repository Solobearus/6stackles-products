const express = require('express');
const router = express.Router();

// CRUD controllers
const { createProduct } = require('../controllers/product/create');
const { getProductsByQuery, getProductById } = require('../controllers/product/read');
const { updateProduct, addImage, removeImage } = require('../controllers/product/update');
const { deleteProductById, deleteProductByAuthorId } = require('../controllers/product/delete');

// CRUD routes

// *Create*
router.post('/product', createProduct);

// *Read*
router.get('/products', getProductsByQuery);
router.get('/product/:productId', getProductById);

// *Update*
router.put('/product/:productId', updateProduct);
router.put('/product/:productId/image', addImage);
router.put('/product/:productId/deleteImage', removeImage);

// *Delete*
router.delete('/products/', deleteProductByAuthorId);
router.delete('/product/:productId', deleteProductById);

module.exports = router;