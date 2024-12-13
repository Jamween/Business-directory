const mongoose = require('mongoose'); // Import Mongoose for defining schema

// Define the schema for a business
const businessSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the business
  category: { type: String, required: true }, // Business category
  address: { type: String, required: true }, // Business address
  hours: String, // Business hours
  rating: { type: Number, min: 1, max: 5 }, // Rating (1-5)
  website: String, // Business website URL
  contact: String, // Contact details
  imageUrl: String // URL for business image
});

// Create a model for the business schema
const Business = mongoose.model('Business', businessSchema);

module.exports = Business; 
