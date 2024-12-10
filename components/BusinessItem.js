import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function BusinessItem(props) {
  const handleDelete = () => {
    axios.delete('http://localhost:4000/api/business/' + props.myBusiness._id)
      .then(() => {
        props.Reload(); // Refresh the list after deletion
      })
      .catch((error) => {
        console.error("Error deleting business:", error);
      });
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Header>{props.myBusiness.name}</Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>Category:</strong> {props.myBusiness.category}
        </Card.Text>
        <Card.Text>
          <strong>Address:</strong> {props.myBusiness.address}
        </Card.Text>
        <Card.Text>
          <strong>Rating:</strong> {props.myBusiness.rating} / 5
        </Card.Text>
        <Link to={"/edit/" + props.myBusiness._id} className="btn btn-primary" style={{ marginRight: "10px" }}>Edit</Link>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Card.Body>
    </Card>
  );
}

export default BusinessItem;
