import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Form } from "react-bootstrap";
import { useStates } from "../assets/helpers/states";

function Traveler() {
  let s = useStates("booking");
   
  function printEachTraveler() {
    if (s.ticket.passengers.lenght > 0) {
      for (let i = 0; i < s.ticket.passengers.length; i++) {
        
      }
    }
  }
  

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
                <Row className="d-flex p-2">
                  <Col className="text-center col-md-4">
                    <label className="custom-text nameLabel">Förnamn</label>
                  </Col>
                  <Col className="text-center col-md-4 col-xl-4">
                    <input className="nameInput firstNameInput" type="text" />
                  </Col>
                </Row>
                <Row className="d-flex p-2">
                  <Col className="text-center col-md-4">
                    <label className="custom-text nameLabel">Efternamn</label>
                  </Col>
                  <Col className="text-center col-md-4 col-xl-4">
                    <input className="nameInput" type="text" />
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Row>
      </Container>
    </>
  );
}

export default Traveler;
