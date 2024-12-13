const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Business = require('./businessModel');



// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://admin:admin@cluster0.qf3py.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Middleware for parsing requests and handling cross-origin issues
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Allow cross-origin headers for requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// API endpoint to get all businesses
app.get('/api/businesses', async (req, res) => {
  try {
    const businesses = await Business.find({}); // Fetch all businesses from MongoDB
    res.json(businesses); // Return the businesses as JSON
  } catch (error) {
    console.error('Error fetching businesses:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// API to get a single business by ID
app.get('/api/business/:id', async (req, res) => {
  try {
    const business = await Business.findById(req.params.id); // Fetch a business by its ID
    if (business) {
      res.json(business); // Return the business if found
    } else {
      res.status(404).json({ message: 'Business not found' }); // Handle not found
    }
  } catch (error) {
    console.error('Error fetching business by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// API to create a new business
app.post('/api/businesses', async (req, res) => {
  try {
    const { name, category, address, hours, rating, website, contact, imageUrl } = req.body; // Extract data from the request 
    const newBusiness = new Business({ name, category, address, hours, rating: Number(rating), website, contact, imageUrl }); // Create a new Business 
    await newBusiness.save(); // Save the new business to MongoDB
    res.status(201).json({ message: 'Business created successfully', business: newBusiness });
  } catch (error) {
    console.error('Error creating business:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// API endpoint to update a business
app.put('/api/business/:id', async (req, res) => {
  try {
    const updatedBusiness = await Business.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update business by ID
    if (updatedBusiness) {
      res.json(updatedBusiness); // Return the updated business
    } else {
      res.status(404).json({ message: 'Business not found' }); // Handle not found
    }
  } catch (error) {
    console.error('Error updating business:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// API endpoint to delete a business
app.delete('/api/business/:id', async (req, res) => {
  try {
    const deletedBusiness = await Business.findByIdAndDelete(req.params.id); // Delete business by ID
    if (deletedBusiness) {
      res.status(200).json({ message: "Business deleted successfully", business: deletedBusiness });
    } else {
      res.status(404).json({ message: "Business not found" }); // Handle not found
    }
  } catch (error) {
    console.error('Error deleting business:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});