import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom"

function NavigationBar({ authedUser, onLogoutClick }) {
  return (
    <Navbar className="justify-content-center bg-light">
      <Container>
        <Navbar.Brand>Welcome to Would you rather!</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/add">Submit New Question</Nav.Link>
          <Nav.Link as={Link} to="/leaderboard">Leaderboard</Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>Signed in as: <Link to="/" onClick={onLogoutClick}>{authedUser.name}</Link></Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
