const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  libele: {
    type: String,
    required: true,
    trim: true, // Supprime les espaces avant et après
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Génère automatiquement la date de création
  },
});

// Créer le modèle basé sur le schéma
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
