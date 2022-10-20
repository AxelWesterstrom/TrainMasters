import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Form } from "react-bootstrap";
import { useStates } from "../assets/helpers/states";

function TravelerTemplate({ personId }) {
  let s = useStates("booking");
  console.log(s.ticket.people[personId].type);
  console.log(s.ticket.people[0].type);

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
                  className="nameInput firstNameInput"
                  type="text"
                  required
                />
              </Col>

              <Col className="">
                <label className="custom-text nameLabel">Efternamn</label>
              </Col>
              <Col className="text-center col-xs-12 col-md-5 col-md-3 col-xl-3">
                <input className="nameInput" type="text" />
              </Col>
            </Container>
          </Row>
        </Form>
      </Container>
    </>
  );
}

export default TravelerTemplate;
