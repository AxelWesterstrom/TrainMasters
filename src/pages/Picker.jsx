import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import { Row, Container, Col, Button } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import Popup from "../components/Popup";
import { useLocation } from "react-router-dom";
import TravelerAdder from "../components/TravelerAdder";

import "react-datepicker/dist/react-datepicker.css";

const travelerTypes = ["Vuxen", "Barn/ungdom(0-25 år)", "Student", "Pensionär"];

function Picker() {
  const [startDate, setStartDate] = useState(new Date());
  const [buttonPopup, setButtonPopup] = useState(false);
  const { state } = useLocation();
  const { departure, arrival } = state;
  const [travelers, setTravelers] = useState(
    travelerTypes.map((type) => {
      return { travelerType: type, count: 0 };
    })
  );

  const modifyTravelerCount = (type, addAmount) => {
    const index = travelers.findIndex((t) => {
      return type == t.travelerType;
    });
    const count = travelers[index].count + addAmount;
    setTravelers([
      ...travelers.slice(0, index),
      Object.assign({}, travelers[index], { count }),
      ...travelers.slice(index + 1),
    ]);
  };

  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <Container>
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          {travelers.map((t, i) => {
            return (
              <TravelerAdder
                key={i}
                travelerType={t.travelerType}
                count={t.count}
                setTraveler={modifyTravelerCount}
              ></TravelerAdder>
            );
          })}
        </Popup>
        <Row>
          <Col md="auto">
            <Button className="customButton">Back</Button>
          </Col>
        </Row>
        <Row className="justify-content-between">
          <Col md="auto">
            <p>
              Resa från: <br></br> {departure}
            </p>
          </Col>
          <Col md="auto">
            Resa Till: <br></br> {arrival}
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
          <Col md="auto">
            {travelers.map((t, i) => {
              return t.count > 0 ? (
                <Row key={i} className="justify-content-between">
                  <Col>{t.travelerType}</Col>
                  <Col>{`x${t.count}`}</Col>
                </Row>
              ) : (
                ""
              );
            })}
          </Col>
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
