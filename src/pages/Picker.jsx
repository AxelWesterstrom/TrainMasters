import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import { Row, Container, Col, Button, Modal } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import Popup from "../components/Popup";
import { useLocation } from "react-router-dom";
import TravelerAdder from "../components/TravelerAdder";
import { useNavigate } from "react-router-dom";
import { Stack } from "react-bootstrap";
import { useStates } from "../assets/helpers/states";

import "react-datepicker/dist/react-datepicker.css";
import styles from "../../public/css/commonStyles.css";

const travelerTypes = ["Vuxen", "Barn/ungdom(0-25 år)", "Student", "Pensionär"];

function Picker() {

  let s = useStates("booking")

  const [buttonPopup, setButtonPopup] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const modifyTravelerCount = (type, addAmount) => {
    const index = s.ticket.passengers.findIndex((t) => {
      return type == t.travelerType;
    });
    const count = s.ticket.passengers[index].count + addAmount;
    s.ticket.passengers = ([
      ...s.ticket.passengers.slice(0, index),
      Object.assign({}, s.ticket.passengers[index], { count }),
      ...s.ticket.passengers.slice(index + 1),
    ]);
  };

  const onSearchClick = () => {
    const addedTravelers = s.ticket.passengers.filter((t) => t.count > 0);
    if (addedTravelers.length == 0) {
      setShowModal(true);
      return;
    }

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
          onClick={() => navigate(-1)}
        />
      </div>
      <Container>
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
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
        </Popup>
        <Row className="justify-content-between">
          <Col md="auto">
            <p>
              Resa från: <br></br> {s.ticket.departure}
            </p>
          </Col>
          <Col md="auto">
            Resa Till: <br></br> {s.ticket.arrival}
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="auto">
            {!buttonPopup && (
              <ReactDatePicker
                selected={new Date(s.ticket.date)}
                onChange={(date) => s.ticket.date = date.getTime()}
                minDate={new Date()}
              ></ReactDatePicker>
            )}
          </Col>
        </Row>
        <Row className="justify-content-center">
          {s.ticket.passengers.filter((t) => t.count > 0).length > 0 ? (
            <Col md="auto" className="traveler-overview">
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
          <Col md="auto">
            <div>
              <img
                alt=""
                src="../images/plus-sign.svg"
                className="mt-2 ms-3 mb-2 add-button"
                style={{ width: "20px" }}
                onClick={() => setButtonPopup(true)}
              />
            </div>
          </Col>
        </Row>
        <Row className="justify-content-end">
          <Col md="auto">
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
