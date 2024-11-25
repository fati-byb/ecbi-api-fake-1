const mongoose = require('mongoose');

// Define the Zone schema
const zoneSchema = new mongoose.Schema({
  libele: {
    type: String,
    required: true,
    trim: true,
  }
}, {
  timestamps: true
});



const Zone = mongoose.model('Zone', zoneSchema);

module.exports = Zone;
