const mongoose = require('mongoose');

const GlobalSettingsSchema = new mongoose.Schema({
  reservationInterval: {
    type: Number, // En minutes
    required: true,
    default: 60 // Valeur par défaut
  },
  maxPeoplePerInterval: {
    type: Number, // Nombre max de personnes autorisées par intervalle
    required: true,
    default: 4 // Valeur par défaut
  }
});

const GlobalSettings = mongoose.model('GlobalSettings', GlobalSettingsSchema);
module.exports = GlobalSettings;
