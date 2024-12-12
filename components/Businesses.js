import React from 'react';
import BusinessItem from './BusinessItem';
import { Container, Row, Col } from 'react-bootstrap';

function Businesses(props) {
  return (
    <Container>
      <Row>
        {props.myBusinesses.map((business) => (
          <Col xs={12} sm={6} md={4} lg={3} key={business._id}>
            <BusinessItem
              myBusiness={business}
              Reload={props.ReloadData} // allow refreshing
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Businesses;
