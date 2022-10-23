import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import QRCode from "react-qr-code"
import { useStates } from "../assets/helpers/states";

function TicketTemplate({ ticket, interval }) {
  let t = useStates("bookingNumber")
  let qrCodeValue = "Namn: " + ticket.person[interval].firstName + " " + ticket.person[interval].lastName + "\n " + ticket.person[interval].type + " \n Vagn: " + ticket.carriageNumber[interval] + " \n Plats: " + ticket.seatNumber[interval] + "\n Bokningsnummer: " + ticket.bookingNumber

  function checkTime(time) {
    let hours = time.substring(
      0,
      time.indexOf(":")
    );
    let minutes = time.substring(
      time.indexOf(":") + 1
    );
    if (hours > 23) {
      hours = hours - 24;
      if (hours < 10) {
        hours = "0" + hours;
      }
      time = hours + ":" + minutes;
    }
    return time;
  }

  return (
    <>
      <Container>
        <Container id="ticketBorder">
          <Row>
            <Col id="ticketTitel" >
              <h1>{ticket.departureStation} - {ticket.arrivalStation}</h1>
            </Col>
          </Row>

          <Container id="ticketDetails">
            <Row >
              <Col className="col-lg-3 col-sm-6"> <h4>Namn</h4>
                <p>
                  {ticket.person[interval].firstName} {ticket.person[interval].lastName}
                </p>
              </Col>
              <Col className="col-lg-3 col-sm-6">
                <h4>Datum</h4>
                <p>
                  {new Date(ticket.date).toLocaleDateString('sv-SE')}
                </p>
              </Col>
              <Col className="col-lg-3 col-sm-6">
                <h4>Avgång</h4>
                <p>
                  {checkTime(ticket.departureTime).slice(0, 5)}
                </p>
              </Col>
              <Col className="col-lg-3 col-sm-6">
                <h4>Ankomst</h4>
                <p>
                  {checkTime(ticket.arrivalTime).slice(0, 5)}
                </p>
              </Col>
            </Row>

            <Row>
              <Col className="col-lg-3 col-sm-6">
                <h4>Biljettyp</h4>
                <p>
                  {ticket.person[interval].type}
                </p>
              </Col>
              <Col className="col-lg-3 col-sm-6">
                <h4>Tågnummer</h4>
                <p>
                  {ticket.trainNumber}
                </p>
              </Col>
              <Col className="col-lg-3 col-sm-6">
                <h4>Vagn</h4>
                <p>
                  {ticket.carriageNumber[interval]}
                </p>
              </Col>
              <Col className="col-lg-3 col-sm-6">
                <h4>Plats</h4>
                <p>
                  {ticket.seatNumber[interval]}
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

export default TicketTemplate;