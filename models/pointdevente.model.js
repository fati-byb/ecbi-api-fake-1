const mongoose = require('mongoose');

const PointDeVenteSchema = new mongoose.Schema({

  website: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    default: ''
  },
 
  state: {
    type: String,
    enum: ['blocked', 'actif'],
    default: 'actif',
    required: true,
  },
  visibility: {
    type: String,
    enum: ['show', 'no show'],
    default: 'show',
    required: true,
  },
}, {
  timestamps: true,
});

const PointDeVente = mongoose.model('PointDeVente', PointDeVenteSchema);

module.exports = PointDeVente;
