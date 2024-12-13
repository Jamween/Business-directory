import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

// Component to display a single business
const BusinessItem = (props) => {
  // business data for debugging 
  useEffect(() => {
    console.log("Business Item:", props.myBusiness);
  }, [props.myBusiness]);

  // Function to delete a business
  const handleDelete = () => {
    axios
      .delete(`http://localhost:4000/api/business/${props.myBusiness._id}`) // Send a delete request
      .then(() => {
        props.Reload(); // Reload the business list after deletion
      })
      .catch((error) => {
        console.error("Error deleting business:", error); // Log errors
      });
  };

  return (
    <Card className="business-card" style={{ width: '100%', margin: '10px auto', height: '400px' }}>
    <Card.Img
      variant="top"
      src={props.myBusiness.imageUrl}
      alt={props.myBusiness.name}
      style={{ height: '150px', objectFit: 'cover' }} // Fixed image height
    />
    <Card.Header>{props.myBusiness.name}</Card.Header>
    <Card.Body style={{ overflowY: 'auto' }}> {/* Enable vertical scrolling */}
      {/* Card content */}
      <Card.Text><strong>Category:</strong> {props.myBusiness.category}</Card.Text>
      <Card.Text><strong>Address:</strong> {props.myBusiness.address}</Card.Text>
      <Card.Text><strong>Hours:</strong> {props.myBusiness.hours}</Card.Text>
      <Card.Text><strong>Rating:</strong> {props.myBusiness.rating} / 5</Card.Text>
      <Card.Text><strong>Contact:</strong> {props.myBusiness.contact}</Card.Text>
      <Card.Text>
        <strong>Website:</strong>{' '}
        <a href={props.myBusiness.website} target="_blank" rel="noopener noreferrer">
          {props.myBusiness.website}
        </a>
      </Card.Text>
      <div className="d-flex justify-content-between">
        <Link to={`/edit/${props.myBusiness._id}`} className="btn btn-primary">Edit</Link>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </div>
    </Card.Body>
  </Card>
  

  );
};

export default BusinessItem; 