// routes/table.routes.js
const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tables/table.controller');


router.post('/add-table', tableController.createTable);
router.get('/get-tables', tableController.getAllTables);
router.get('/get-table/:id', tableController.getTableById);
router.put('/update/:id', tableController.updateTable);
router.put('/updateDisplay/:id', tableController.updateDisplayTable);

router.delete('/delete/:id', tableController.deleteTable);

module.exports = router;
