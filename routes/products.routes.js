const express = require('express');
const router = express.Router();
const productController = require('../controllers/products/products.controller');
const uploadImage = require('../config/multer');

router.get('/get-products', productController.getProducts);

router.get('/get-products/:id', productController.getProductById);

router.post('/add-product', uploadImage.single('image'), productController.createProduct);

router.put('/update/:id', uploadImage.single('image'), productController.updateProduct);

router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;
