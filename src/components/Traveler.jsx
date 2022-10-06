import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Form } from "react-bootstrap";

function Traveler() {
  return (
    <>
      <Container className="travelerContainer">
        <Row>
          <Col className="travelers">
            <p className="custom-label">Resenärer</p>
          </Col>
        </Row>
        <Row>
          <Col className="person">
            <p className="custom-label">Resenär 1 - Kontaktperson</p>
          </Col>
          <Row>
            <Col>
              <Form>
                <Container>
                  <label className="custom-text nameLabel">Förnamn</label>
                  <input className="nameInput firstNameInput" type="text" />
                </Container>
                <Container>
                  <label className="custom-text nameLabel">Efternamn</label>
                  <input className="nameInput" type="text" />
                </Container>
              </Form>
            </Col>
          </Row>
        </Row>
      </Container>
    </>
  );
}

export default Traveler;
