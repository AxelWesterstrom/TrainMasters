import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import style from "../../public/css/header.css";

function Header() {
  const location = useLocation();
  const [currentRoute, setCurrentRoute] = useState("");
  const [isMyTicketPage, setIsMyTicketPage] = useState(false);

  useEffect(() => {
    setCurrentRoute(location.pathname);
    if (currentRoute == "/mina-biljetter") {
      setIsMyTicketPage(true);
    } else {
      setIsMyTicketPage(false);
    }
  }, [location]);

  return (
    <>
      <Navbar style={{ background: "#4C2C50" }} expand="lg" className="body">
        <Container fluid className="row">
          <Container className="col-2 custom-column"></Container>
          <Container className="col-8 logo">
            <Navbar.Brand>
              <Nav.Link as={Link} to="/">
                <img alt="" src="logo.svg" className="logo-img" />
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
                    <img src="ticket-icon.svg" className="ticket-img" />
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
