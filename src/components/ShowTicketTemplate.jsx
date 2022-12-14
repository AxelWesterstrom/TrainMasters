import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import QRCode from "react-qr-code"
import { useStates } from "../assets/helpers/states";

function showTicketTemplate({ interval }) {
  let s = useStates("booking")
  let qrCodeValue = "Namn: " + s.ticket.people[interval].firstName + " "
    + s.ticket.people[interval].lastName + "\n "
    + s.ticket.people[interval].type + " \n Vagn: "
    + s.ticket.seats[interval].carriage + " \n Plats: "
    + s.ticket.seats[interval].seatNumber + "\n Bokningsnummer: "
    + s.ticket.bookingNumber
  return (
    <>
      <Container className="ticketContainer">
        <Container id="ticketBorder">
          <Row>
            <Col id="ticketTitel" >
              <h1>{s.ticket.departure} - {s.ticket.arrival}</h1>
            </Col>
          </Row>

          <Container id="ticketDetails">
            <Row >
              <Col className="col-lg-3 col-sm-6"> <h4>Namn</h4>
                <p>
                  {s.ticket.people[interval].firstName} {s.ticket.people[interval].lastName}
                </p>
              </Col>
              <Col className="col-lg-3 col-sm-6">
                <h4>Datum</h4>
                <p>
                  {new Date(s.ticket.date).toLocaleDateString('sv-SE')}
                </p>
              </Col>
              <Col className="col-lg-3 col-sm-6">
                <h4>Avgång</h4>
                <p>
                  {s.ticket.chosenJourney
                    .departureTimeA}
                </p>
              </Col>
              <Col className="col-lg-3 col-sm-6">
                <h4>Ankomst</h4>
                <p>
                  {s.ticket.chosenJourney
                    .arrivalTimeB}
                </p>
              </Col>
            </Row>

            <Row>
              <Col className="col-lg-3 col-sm-6">
                <h4>Biljettyp</h4>
                <p>
                  {s.ticket.people[interval].type}
                </p>
              </Col>
              <Col className="col-lg-3 col-sm-6">
                <h4>Tågnummer</h4>
                <p>
                  {s.ticket.chosenJourney.trainNumber}
                </p>
              </Col>
              <Col className="col-lg-3 col-sm-6">
                <h4>Vagn</h4>
                <p>
                  {s.ticket.seats[interval].carriage}
                </p>
              </Col>
              <Col className="col-lg-3 col-sm-6">
                <h4>Plats</h4>
                <p>
                  {s.ticket.seats[interval].seatNumber}
                </p>
              </Col>
            </Row>
          </Container>
          <Row >
            <Col className="qrCode">
              <QRCode
                size={150}
                value={qrCodeValue}
              /></Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default showTicketTemplate;