import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import style from "../../public/css/header.css";

function Header({ isMyTicketPage }) {
  return (
    <>
      <Navbar style={{ background: "#4C2C50" }} expand="lg" className="body">
        <Container fluid className="row p-0">
          <Container className="col-2 custom-column p-0"></Container>
          <Container className="col-8 logo p-0">
            <Nav.Link as={Link} to="/">
              <img alt="" src="../images/logo.svg" className="logo-img" />
            </Nav.Link>
          </Container>
          <Container className="col-2 d-flex justify-content-end ">
            {!isMyTicketPage && (
              <Nav>
                <Nav.Link
                  as={Link}
                  to="/mina-biljetter"
                  className="ticket-button text-center"
                >
                  <div className="mt-2">
                    <img
                      src="../images/ticket-icon.svg"
                      className="ticket-img"
                    />
                  </div>
                  <p className="ticket-button-text">Biljetter</p>
                </Nav.Link>
              </Nav>
            )}
          </Container>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
