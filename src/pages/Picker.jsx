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

import "react-datepicker/dist/react-datepicker.css";
import styles from "../../public/css/commonStyles.css";

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
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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

  const onSearchClick = () => {
    const addedTravelers = travelers.filter((t) => t.count > 0);
    if (addedTravelers.length == 0) {
      setShowModal(true);
      return;
    }

    navigate("/valj-tag", {
      state: { travelers, departure, arrival, startDate },
    });
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
                minDate={new Date()}
              ></ReactDatePicker>
            )}
          </Col>
        </Row>
        <Row className="justify-content-center">
          {travelers.filter((t) => t.count > 0).length > 0 ? (
            <Col md="auto" className="traveler-overview">
              {travelers.map((t, i) => {
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
