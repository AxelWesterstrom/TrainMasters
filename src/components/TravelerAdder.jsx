import React from "react";
import { Row, Button, Col } from "react-bootstrap";

function TravelerAdder({ travelerType, count, setTraveler }) {
  const decrementCount = () => {
    if (count > 0) {
      setTraveler(travelerType, -1);
    }
  };
  const incrementCount = () => {
    setTraveler(travelerType, 1);
  };

  return (
    <Row className="justify-content-between">
      <Col>
        <p>{travelerType}</p>
      </Col>
      <Col>
        <Row>
          <Button width="auto" onClick={decrementCount}>
            -
          </Button>
          <p>{count}</p>
          <Button onClick={incrementCount}>+</Button>
        </Row>
      </Col>
    </Row>
  );
}

export default TravelerAdder;
