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
      <Container className="mb-2">
        <Row>
          <p className="custom-text">
            Resenär {personId + 1}: {s.ticket.people[personId].type}
          </p>
        </Row>
        <div>
          <Form>
            <Row>
              <Col className="col col-lg-6 col-12">
                <Form.Label className="custom-text nameLabel me-2">
                  Förnamn
                </Form.Label>
                <Form.Control
                  id={personId}
                  className="nameInput"
                  type="text"
                  required
                  onChange={(event) => {
                    handleFormInputFirstName(event);
                  }}
                />
              </Col>

              <Col className="col col-lg-6 col-12">
                <Form.Label className="custom-text nameLabel me-2">
                  Efternamn
                </Form.Label>
                <Form.Control
                  id={personId}
                  className="nameInput"
                  type="text"
                  required
                  onChange={(event) => {
                    handleFormInputLastName(event);
                  }}
                />
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
    </>
  );
}

export default TravelerTemplate;
