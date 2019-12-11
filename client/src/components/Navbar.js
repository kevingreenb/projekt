import React, { Fragment } from "react";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const Navigator = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <Nav className="ml-auto">
      <Nav.Link href="/projects">Projects</Nav.Link>
      <NavDropdown title="Reports" id="basic-nav-dropdown">
        <NavDropdown.Item href="/deletions-report">
          Deletion Report
        </NavDropdown.Item>
        <NavDropdown.Item href="/logins-report">Login Report</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href="/projects" onClick={e => logout()}>
        Logout
      </Nav.Link>
    </Nav>
  );

  const guestLinks = (
    <Nav className="ml-auto">
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/register">Register</Nav.Link>
    </Nav>
  );
  return (
    <Fragment>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Projekt</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {isAuthenticated ? authLinks : guestLinks}
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navigator);
