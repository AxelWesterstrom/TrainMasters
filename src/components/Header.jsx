import React from "react";
import { useState } from "react";
import { useStates } from "../assets/helpers/states";
import { Container, Navbar, Nav, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import style from "../../public/css/header.css";

function Header({ }) {

  const navigate = useNavigate();

  let log = useStates("login");
  let u = useStates("user");

  const logOut = () => {
    log.login = false;
    u.email = "";
    u.showMessage = 'logout';
    navigate("/");
  };



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
                  <Dropdown.Item onClick={() => navigate("/mina-biljetter")}>
                    Mina biljetter
                  </Dropdown.Item>
                  {!log.login
                    ? <Dropdown.Item onClick={() => navigate("/logga-in")}>
                      Logga in
                    </Dropdown.Item>
                    : <Dropdown.Item onClick={logOut} >
                      Logga ut
                    </Dropdown.Item>
                  }
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