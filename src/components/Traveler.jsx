import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Form } from "react-bootstrap";
import { useStates } from "../assets/helpers/states";
import TravelerTemplate from "../components/TravelerTemplate";

function Traveler() {
  let s = useStates("booking");

  let count = 0;
  s.ticket.passengers.map((x) => {
    count += x.count;
  });

  const list = [];

  function typeOutTravelers() {
    for (let i = 0; i < count; i++) {
      list.push(<TravelerTemplate personId={i}/>);
    }
    return <div>{list}</div>;
  }

  return (
    <>
      <Container className="travelerContainer">
        <Row>
          <Col className="travelers">
            <p className="custom-label">Resenärer</p>
          </Col>
        </Row>
        {typeOutTravelers()}
      </Container>
    </>
  );
}

export default Traveler;
