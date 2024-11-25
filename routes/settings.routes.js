
const router = require('express').Router();

const GlobalSettingsController = require("../controllers/settings/setting.controller");

// Route pour créer ou récupérer les paramètres globaux
router.get('/get', GlobalSettingsController.getGlobalSettings);

// Route pour mettre à jour les paramètres globaux
router.put('/update', GlobalSettingsController.updateGlobalSettings);

module.exports = router;
