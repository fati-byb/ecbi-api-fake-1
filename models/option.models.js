// models/option.model.js
const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  elements: [{
    type: String,
  }],
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Reference back to the Product
    required: true,
  },
}, {
  timestamps: true,
});

const Option = mongoose.model('Option', optionSchema);

module.exports = Option;
