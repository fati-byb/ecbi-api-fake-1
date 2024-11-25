// routes/optionRoutes.js
const express = require('express');
const router = express.Router();
const optionController = require('../controllers/options/option.controller');

// Route to create a new option
router.post('/addOptions', optionController.createOption);
router.get('/getOptions', optionController.getProductsOptions);
router.put('/update/:optionId', optionController.updateOption); // Update route
router.delete('/delete/:optionId', optionController.deleteOption); // De


module.exports = router;
