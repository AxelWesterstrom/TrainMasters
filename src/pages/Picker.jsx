import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import { Row, Container, Col, Button } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import Popup from "../components/Popup";

import "react-datepicker/dist/react-datepicker.css";

function Picker() {
  const [startDate, setStartDate] = useState(new Date());
  const [buttonPopup, setButtonPopup] = useState(false);
  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <Container>
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          content
        </Popup>
        <Row>
          <Col md="auto">
            <Button className="customButton">Back</Button>
          </Col>
        </Row>
        <Row className="justify-content-between">
          <Col md="auto">
            <p>
              Resa från: <br></br> Malmö C
            </p>
          </Col>
          <Col md="auto">
            Resa Till: <br></br> Stockholm C
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="auto">
            {!buttonPopup && (
              <ReactDatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              ></ReactDatePicker>
            )}
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="auto">Vuxna x3</Col>
          <Col md="auto">
            <Button
              className="customButton"
              onClick={() => setButtonPopup(true)}
            >
              Add
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-end">
          <Col md="auto">
            <Button className="customButton">Fortsätt</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Picker;
