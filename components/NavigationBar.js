
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Local Business Directory</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/read">Home</Nav.Link>
          <Nav.Link href="/create">Add Business</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
