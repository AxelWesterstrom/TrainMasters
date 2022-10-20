import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import JourneyList from "../components/JourneyList";
import DateSlider from "../components/DateSlider";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import "../../public/css/journey.css";
import { useNavigate } from "react-router-dom";
import { useStates } from "../assets/helpers/states";

function PickJourney() {
  let s = useStates("booking");

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    if (!s.ticket.departure || !s.ticket.arrival) {
      navigate("/");
    }
    if (!s.ticket.passengers || !s.ticket.date) {
      navigate("/valj-resa");
    }
  }, []);

  const goToNextPage = () => {
    if (Object.keys(s.ticket.chosenJourney).length !== 0) {
      navigate("/anpassa-resa");
    } else {
      setShowModal(true);
    }
  };

  async function handleMail(e) {
    e.preventDefault;
    await fetch("/api/mailer", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "anne.perstav@hotmail.com",
        date: new Date(s.ticket.date).toLocaleDateString("sv-SE"),
        chosenJourney: s.ticket.chosenJourney,
        totalPassengers: s.ticket.people.length,
        bookingsNumber: s.ticket.bookingNumber
      })
    });
  }

  return (
    <div className='pickJourney pb-5'>
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
              <p className='custom-label'>{s.ticket.departure}</p>
            </Col>
            <Col className='d-flex justify-content-end'>
              <p className='custom-label'>{s.ticket.arrival}</p>
            </Col>
          </Row>
        </Container>
        <DateSlider />

        <Container className='pe-2 ps-2'>
          <Container className='info'>
            <Row className='journeyList'>
              <JourneyList />
            </Row>
          </Container>
        </Container>

        <Container className='d-flex justify-content-end mb-5 pb-5'>
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
              Stäng
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}
export default PickJourney;
