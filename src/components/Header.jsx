import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  return (
    <>
      <Navbar style={{ background: "#4C2C50" }}>
        <Container className="justify-content-center">
          <Navbar.Brand href="#hem">
            <img alt="" src="logo.svg" width="200" height="70" />
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
