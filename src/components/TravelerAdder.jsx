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
    <Row className="d-flex justify-content-between">
      <Col className="col-6 ms-3">
        <p style={{ display: "inline-flex" }} className="custom-text">
          {travelerType}
        </p>
      </Col>
      <Col className="col-lg-3 col-xs-4">
        <Row className="justify-content-center">
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
  );
}

export default TravelerAdder;
