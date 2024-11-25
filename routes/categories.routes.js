const router = require('express').Router();
const categoryController = require('../controllers/categories/category.controller');

router.post('/add-category',categoryController.createCategory);
router.get('/get-categories',categoryController.getCategories);
router.delete('/delete/:id', categoryController.deleteCategory);
router.put('/update/:id', categoryController.updateCategory);


 
module.exports = router;
