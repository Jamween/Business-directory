const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  address: { type: String, required: true },
  hours: { type: String },
  rating: { type: Number, default: 0 },
  website: { type: String },
  contact: { type: String }
});

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;
