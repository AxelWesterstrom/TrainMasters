import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container, Navbar, Nav, Modal } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import style from "../../public/css/header.css";
import LoginPopup from "./LoginPopup";

function Header({ isMyTicketPage }) {
  return (
    <>
      <Navbar style={{ background: "#4C2C50" }} expand="lg" className="body">
        <Container fluid className="row">
          <Container className="col-2 custom-column">
            <div className="mt-2">
              <img src="../images/profile.svg" className="profile-img" />
              <LoginPopup />
            </div>
            <p className="profile-button-text">Profil</p>
          </Container>
          <Container className="col-8 logo">
            <Navbar.Brand>
              <Nav.Link as={Link} to="/">
                <img alt="" src="../images/logo.svg" className="logo-img" />
              </Nav.Link>
            </Navbar.Brand>
          </Container>
          <Container className="col-2 d-flex justify-content-end p-0">
            {!isMyTicketPage && (
              <Nav>
                <Nav.Link
                  as={Link}
                  to="/mina-biljetter"
                  className="ticket-button text-center"
                >
                  <div className="mt-2">
                    <img src="../images/ticket-icon.svg" className="ticket-img" />
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
