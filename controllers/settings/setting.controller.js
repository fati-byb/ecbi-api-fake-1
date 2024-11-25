

const mongoose = require('mongoose');
const GlobalSettings = require("../../models/setting.model");

const GlobalSettingsController = {};

// Créer ou récupérer les paramètres globaux
GlobalSettingsController.getGlobalSettings = async (req, res) => {
    try {
        let settings = await GlobalSettings.findOne();
        // Si aucun réglage n'existe, en créer un par défaut
        if (!settings) {
            settings = await GlobalSettings.create({});
        }
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des paramètres globaux', error });
    }
};

// Mettre à jour les paramètres globaux
GlobalSettingsController.updateGlobalSettings = async (req, res) => {
    try {
        const { reservationInterval, maxPeoplePerInterval } = req.body;
        const updatedSettings = await GlobalSettings.findOneAndUpdate(
            {}, // Met à jour le premier document trouvé
            { reservationInterval, maxPeoplePerInterval },
            { new: true, runValidators: true }
        );
        res.status(200).json(updatedSettings);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour des paramètres globaux', error });
    }
};

// Exporter les fonctions du contrôleur
module.exports = GlobalSettingsController;

