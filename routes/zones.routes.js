const express = require('express');
const router = express.Router();
const zonesController = require('../controllers/zones/zone.controller'); // Import your zones controller


router.post('/add-zone', zonesController.createZone);
router.get('/get-zones', zonesController.getZones);
router.get('/get-zone/:id', zonesController.getZoneById);
router.put('/update/:id', zonesController.updateZone);
router.delete('/delete/:id', zonesController.deleteZone);

module.exports = router;
