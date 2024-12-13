import React from 'react';
import BusinessItem from './BusinessItem';
import { Container, Row, Col } from 'react-bootstrap'; // Import Bootstrap grid components

// Component to display a list of businesses in a grid
function Businesses(props) {
  return (
    <Container>
      <Row>
        {props.myBusinesses.map((business) => (
          <Col xs={12} sm={6} md={4} lg={3} key={business._id}> {/* Adjust column size */}
            <BusinessItem
              myBusiness={business} // Pass individual business data 
              Reload={props.ReloadData} // function to refresh the list
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Businesses; 
