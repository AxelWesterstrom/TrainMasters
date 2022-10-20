import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Form } from "react-bootstrap";
import { useStates } from "../assets/helpers/states";

function TravelerTemplate({ personId }) {
  let s = useStates("booking");

  function handleFormInputFirstName(event) {
    s.ticket.people[personId].firstName = event.target.value

  }
  function handleFormInputLastName(event) {
    s.ticket.people[personId].lastName = event.target.value
  }

  return (
    <>
      <Container>
        <Col className="person">
          <p className="custom-label">
            Resenär {personId + 1}: {s.ticket.people[personId].type}
          </p>
        </Col>
        <Form className="travelerForm">
          <Row className="">
            <Container>
              <Col className="">
                <label className="custom-text nameLabel">Förnamn</label>
              </Col>
              <Col className="text-center col-xs-12 col-md-5 col-md-3 col-xl-3">
                <input
                  id={personId}
                  className="nameInput firstNameInput"
                  type="text"
                  required
                  onChange={(event) => { handleFormInputFirstName(event) }}
                />
              </Col>

              <Col className="">
                <label className="custom-text nameLabel">Efternamn</label>
              </Col>
              <Col className="text-center col-xs-12 col-md-5 col-md-3 col-xl-3">
                <input id={personId} className="nameInput" type="text" required onChange={(event) => { handleFormInputLastName(event) }} />
              </Col>
            </Container>
          </Row>
        </Form>
      </Container>
    </>
  );
}

export default TravelerTemplate;
