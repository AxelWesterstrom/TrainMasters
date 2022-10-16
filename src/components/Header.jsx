import React from "react";
import { useState } from "react";
import { useStates } from "../assets/helpers/states";
import { useEffect } from "react";
import { Container, Navbar, Nav, Modal, Dropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import style from "../../public/css/header.css";

function Header({ }) {

  const { click, setClick } = useState(false);
  const { dropdown, setDropdown } = useState(false);

  const handleClick = () => setClick(!click);

  let log = useStates("login");


  return (
    <>
      <Navbar style={{ background: "#4C2C50" }} expand="lg" className="body">
        <Container fluid className="row">
          <Container className="col-2 custom-column"></Container>
          <Container className="col-8 logo">
            <Navbar.Brand>
              <Nav.Link as={Link} to="/">
                <img alt="" src="../images/logo.svg" className="logo-img" />
              </Nav.Link>
            </Navbar.Brand>
          </Container>
          <Container className="col-2 d-flex justify-content-end p-0">
            <Nav>
              <Dropdown className="dropdown-custom">
                <Dropdown.Toggle className="dropdownLabel"></Dropdown.Toggle>
                <Dropdown.Menu
                  className="dropdown-menu"
                  style={{
                    left: "-76px",
                    position: "absolute"
                  }}
                >
                  <Dropdown.Item href="/mina-biljetter">
                    Mina Biljetter
                  </Dropdown.Item>
                  <Dropdown.Item href="/logga-in">Logga in</Dropdown.Item>
                  <Dropdown.Item href="/kontakta-oss">
                    Kontakta oss
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Container>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;

// {unreadMessages.length > 0 &&
//   <h2>
//     You have {unreadMessages.length} unread messages.
//   </h2>
// }