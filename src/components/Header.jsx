import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <Navbar style={{ background: "#4C2C50" }}>
        <Container className="justify-content-center">
          <Nav>
            <Nav.Link as={Link} to="/">
              <img alt="" src="logo.svg" width="200" height="70" />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
