const express = require('express');
const router = express.Router();

// CRUD controllers
const { createProduct } = require('../controllers/product/create');
const { getAllProducts, getProductById, getProductsByCategoryId } = require('../controllers/product/read');
const { updateProduct, addImage, removeImage } = require('../controllers/product/update');
const { deleteProductById, deleteProductByAuthorId } = require('../controllers/product/delete');

// CRUD routes

// *Create*
router.post('/products', createProduct);
router.post('/product/:productId/images', addImage);

// *Read*
router.get('/products', getAllProducts);
router.get('/products/:categoryId', getProductsByCategoryId);
router.get('/product/:productId', getProductById);

// *Update*
router.put('/product/:productId', updateProduct);

// *Delete*
router.delete('/product/:productId/images', removeImage);
router.delete('/products/', deleteProductByAuthorId);
router.delete('/product/:productId', deleteProductById);

module.exports = router;