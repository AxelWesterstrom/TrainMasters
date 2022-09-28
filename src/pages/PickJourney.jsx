import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import JourneyList from "../components/JourneyList";
import DateSlider from "../components/DateSlider";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import "../../public/css/journey.css";
import "../../public/css/home.css";
import { useNavigate } from "react-router-dom";

function PickJourney() {
  const [date, setDate] = useState("2022-09-26");
  // const [journeys, setJourneys] = useState([]);
  const [departure, setDeparture] = useState("Trelleborg");
  const [arrival, setArrival] = useState("Malmö C");
  const [chosenJourney, setChosenJourney] = useState();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

  const goToNextPage = () => {
    if (chosenJourney !== undefined) {
      navigate("/anpassa-resa", {
        state: { chosenJourney, date, departure, arrival }
      });
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className='pickJourney'>
      <Header />
      <div>
        <img
          alt='arrowBack'
          src='../images/arrow-left.svg'
          className='mt-2 ms-3 mb-2 back-button'
          onClick={() => navigate("/valj-resa")}
        />
      </div>

      <Container className='journeyContainer'>
        <Container className='custom-container'>
          <Row className='d-flex justify-content-between'>
            <Col className='d-flex justify-content-start'>
              <p className='custom-label'>Resa från</p>
            </Col>
            <Col className='d-flex justify-content-end'>
              <p className='custom-label'>Resa till</p>
            </Col>
          </Row>
          <Row className='d-flex justify-content-between'>
            <Col className='d-flex justify-content-start'>
              <p className='custom-label'>{departure}</p>
            </Col>
            <Col className='d-flex justify-content-end'>
              <p className='custom-label'>{arrival}</p>
            </Col>
          </Row>
        </Container>
        <DateSlider {...{ date, setDate }} />

        <Container className='pe-2 ps-2'>
          <Container className='info'>
            <Row className='journeyList'>
              <JourneyList
                {...{
                  date,
                  departure,
                  arrival,
                  chosenJourney,
                  setChosenJourney
                }}
              />
            </Row>
          </Container>
        </Container>

        <Container className='d-flex justify-content-end p-5 info'>
          <Button className='custom-button mt-3 mb-5' onClick={goToNextPage}>
            Fortsätt
          </Button>
        </Container>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>

          <Modal.Body>
            <p className='custom-label'>Välj en resa!</p>
          </Modal.Body>

          <Modal.Footer>
            <Button className='custom-button' onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}
export default PickJourney;
