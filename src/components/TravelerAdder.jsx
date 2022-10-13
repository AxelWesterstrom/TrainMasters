import React from "react";
import { Row, Button, Col, Container } from "react-bootstrap";
import "../../public/css/picker.css";

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
    <Container>
      <Row className="justify-content-between">
        <Col className="md-auto">
          <p style={{ display: "inline-flex" }} className="custom-text">
            {travelerType}
          </p>
        </Col>
        <Col>
          <Row className="justify-content-end">
            <div className="icon-container">
              <img
                alt=""
                src="../images/minus-sign.svg"
                className="mt-2 ms-3 mb-2 set-count-btn"
                onClick={decrementCount}
              />
            </div>
            <div className="count-container custom-text">{count}</div>
            <div className="icon-container">
              <img
                alt=""
                src="../images/plus-sign.svg"
                className="mt-2 ms-3 mb-2 set-count-btn"
                onClick={incrementCount}
              />
            </div>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default TravelerAdder;
