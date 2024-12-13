import { useState } from "react";
import axios from "axios";

// Component for adding a new business
function Create() {
  // form fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');
  const [hours, setHours] = useState('');
  const [rating, setRating] = useState('');
  const [website, setWebsite] = useState('');
  const [contact, setContact] = useState('');
  const [imageUrl, setImageUrl] = useState(''); 

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form 

    // Create a new business object
    const newBusiness = {
      name,
      category,
      address,
      hours,
      rating: Number(rating), // Ensure rating is a number
      website,
      contact,
      imageUrl
    };

    // Send a request to add the business
    axios.post('http://localhost:4000/api/businesses', newBusiness)
      .then((response) => {
        console.log("Business added:", response.data);
        // Clear the form fields after submission
        setName('');
        setCategory('');
        setAddress('');
        setHours('');
        setRating('');
        setWebsite('');
        setContact('');
        setImageUrl('');
        alert("Business added successfully!"); // Show success message
      })
      .catch((error) => {
        console.error("Error adding business:", error); // Log errors
      });
  };

  return (
    <div>
      <h2>Add a New Business</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Business Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Hours:</label>
          <input
            type="text"
            className="form-control"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Rating (1-5):</label>
          <input
            type="number"
            className="form-control"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
          />
        </div>
        <div className="form-group">
          <label>Website:</label>
          <input
            type="url"
            className="form-control"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Contact:</label>
          <input
            type="text"
            className="form-control"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="url"
            className="form-control"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Add Business</button>
      </form>
    </div>
  );
}

export default Create; 