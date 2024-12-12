import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Edit() {
  const { id } = useParams(); // Get the business ID from the URL
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');
  const [hours, setHours] = useState('');
  const [rating, setRating] = useState('');
  const [website, setWebsite] = useState('');
  const [contact, setContact] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Fetch the existing business details
  useEffect(() => {
    axios.get(`http://localhost:4000/api/business/${id}`)
      .then((response) => {
        const business = response.data;
        setName(business.name);
        setCategory(business.category);
        setAddress(business.address);
        setHours(business.hours);
        setRating(business.rating);
        setWebsite(business.website);
        setContact(business.contact);
        setImageUrl(business.imageUrl);
      })
      .catch((error) => {
        console.error("Error fetching business:", error);
      });
  }, [id]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedBusiness = {
      name,
      category,
      address,
      hours,
      rating: Number(rating), 
      website,
      contact,
      imageUrl
    };

    axios.put(`http://localhost:4000/api/business/${id}`, updatedBusiness)
      .then((response) => {
        console.log("Business updated:", response.data);
        navigate('/read'); // Redirect to the business list
      })
      .catch((error) => {
        console.error("Error updating business:", error);
      });
  };

  return (
    <div>
      <h2>Edit Business</h2>
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
        <button type="submit" className="btn btn-primary mt-3">Update Business</button>
      </form>
    </div>
  );
}

export default Edit;
