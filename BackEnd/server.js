const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Business = require('./businessModel');



mongoose.connect('mongodb+srv://admin:admin@cluster0.qf3py.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Crud Routes
// GET all businesses
app.get('/api/businesses', async (req, res) => {
    try {
      const businesses = await Business.find({});
      res.json(businesses);
    } catch (error) {
      console.error('Error fetching businesses:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // GET a business by ID
  app.get('/api/business/:id', async (req, res) => {
    try {
      const business = await Business.findById(req.params.id);
      if (business) {
        res.json(business);
      } else {
        res.status(404).json({ message: 'Business not found' });
      }
    } catch (error) {
      console.error('Error fetching business by ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // POST Create a new business
  app.post('/api/businesses', async (req, res) => {
    try {
      const { name, category, address, hours, rating, website, contact } = req.body;
      const newBusiness = new Business({ name, category, address, hours, rating, website, contact });
      await newBusiness.save();
  
      console.log("New business saved:", newBusiness);
      res.status(201).json({ message: 'Business created successfully', business: newBusiness });
    } catch (error) {
      console.error('Error creating business:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // PUT Update an existing business
  app.put('/api/business/:id', async (req, res) => {
    try {
      const updatedBusiness = await Business.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // Return the updated document
      );
      if (updatedBusiness) {
        res.json(updatedBusiness);
      } else {
        res.status(404).json({ message: 'Business not found' });
      }
    } catch (error) {
      console.error('Error updating business:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // DELETE an existing business
  app.delete('/api/business/:id', async (req, res) => {
    try {
      console.log('Deleting business with ID:', req.params.id);
      const deletedBusiness = await Business.findByIdAndDelete(req.params.id);
      if (deletedBusiness) {
        res.status(200).json({ message: "Business deleted successfully", business: deletedBusiness });
      } else {
        res.status(404).json({ message: "Business not found" });
      }
    } catch (error) {
      console.error('Error deleting business:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
