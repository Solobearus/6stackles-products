const express = require('express');
const router = express.Router();

// CRUD controllers
const { createCategory } = require('../controllers/category/create');
const { getAllCategories, getCategoryById } = require('../controllers/category/read');
const { updateCategory } = require('../controllers/category/update');
const { deleteCategoryById } = require('../controllers/category/delete');

// CRUD routes

// *Create*
router.post('/categories', createCategory);

// *Read*
router.get('/categories', getAllCategories);
router.get('/categories/:categoryId', getCategoryById);

// *Update*
router.put('/categories/:categoryId', updateCategory);

// *Delete*
router.delete('/categories/:categoryId', deleteCategoryById);

module.exports = router;