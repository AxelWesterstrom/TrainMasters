import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import { Row, Container, Col, Button, Modal } from "react-bootstrap";
import Calendar from "react-calendar";
import Popup from "../components/Popup";
import { useLocation } from "react-router-dom";
import TravelerAdder from "../components/TravelerAdder";
import { useNavigate } from "react-router-dom";
import { Stack } from "react-bootstrap";
import { useStates } from "../assets/helpers/states";
import "react-calendar/dist/Calendar.css";
import styles from "../../public/css/commonStyles.css";

const travelerTypes = ["Vuxen", "Barn/ungdom(0-25 år)", "Student", "Pensionär"];

function Picker() {
  let s = useStates("booking");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!s.ticket.departure || !s.ticket.arrival) {
      navigate("/");
    }
  }, []);

  const modifyTravelerCount = (type, addAmount) => {
    const index = s.ticket.passengers.findIndex((t) => {
      return type == t.travelerType;
    });
    const count = s.ticket.passengers[index].count + addAmount;
    s.ticket.passengers = [
      ...s.ticket.passengers.slice(0, index),
      Object.assign({}, s.ticket.passengers[index], { count }),
      ...s.ticket.passengers.slice(index + 1),
    ];
  };

  const onSearchClick = () => {
    const addedTravelers = s.ticket.passengers.filter((t) => t.count > 0);
    if (addedTravelers.length == 0) {
      setShowModal(true);
      return;
    }
    let peopleList = [];

    s.ticket.passengers.map((x) => {
      if (x.count > 0) {
        for (let y = 0; y < x.count; y++) {
          peopleList.push({
            firstName: "",
            lastName: "",
            type: x.travelerType,
          });
        }
      }
    });

    s.ticket.people = peopleList;
    console.log(s.ticket.people);
    navigate("/valj-tag");
  };

  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div>
        <img
          alt="arrowBack"
          src="../images/arrow-left.svg"
          className="mt-2 ms-3 mb-2 back-button"
          onClick={() => navigate("/")}
        />
      </div>
      <Container className="stations-container">
        <Row className="justify-content-between">
          <Col className="col">
            <p className="custom-label">
              Resa från: <br></br> {s.ticket.departure}
            </p>
          </Col>
          <Col className="col d-flex justify-content-end">
            <p className="custom-label">
              Resa till: <br></br> {s.ticket.arrival}
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Calendar
            className="calendar"
            onChange={(date) => (s.ticket.date = date.getTime())}
            value={new Date(s.ticket.date)}
            minDate={new Date()}
            locale="sv"
            next2Label={null}
            prev2Label={null}
            showFixedNumberOfWeeks={true}
          />
          {/* {!buttonPopup && (
              <ReactDatePicker
                selected={new Date(s.ticket.date)}
                onChange={(date) => s.ticket.date = date.getTime()}
                minDate={new Date()}
              ></ReactDatePicker>
            )} */}
        </Row>
        {/* <Row className="justify-content-center">
          {s.ticket.passengers.filter((t) => t.count > 0).length > 0 ? (
            <Col className="col-9 traveler-overview">
              {s.ticket.passengers.map((t, i) => {
                return t.count > 0 ? (
                  <Stack key={i} direction="horizontal">
                    <div>{t.travelerType}</div>
                    <div className="ms-auto">{`x${t.count}`}</div>
                  </Stack>
                ) : (
                  ""
                );
              })}
            </Col>
          ) : (
            ""
          )}
        </Row> */}
        <Container className="passenger-container mt-4 mb-2">
          {s.ticket.passengers.map((t, i) => {
            return (
              <TravelerAdder
                key={i}
                travelerType={t.travelerType}
                count={t.count}
                setTraveler={modifyTravelerCount}
              ></TravelerAdder>
            );
          })}
        </Container>
        <Row className="m-3">
          <Col className="d-flex justify-content-end">
            <Button className="custom-button" onClick={() => onSearchClick()}>
              Sök resa
            </Button>
          </Col>
        </Row>
        <Modal
          show={showModal}
          onHide={() => {
            setShowModal(false);
          }}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <p className="custom-label">
              Lägg till resenärer innan du fortsätter
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="custom-button"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Stäng
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default Picker;
