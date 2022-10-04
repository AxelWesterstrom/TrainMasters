import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import QRCode from "react-qr-code"

function TicketTemplate() {
  return (
    <>
      <Container>
        <Container id="ticketBorder">
          <Row>
            <Col id="ticketTitel" >
              <h1>Göteborg-C  -  Stockholm-C</h1>
            </Col>
          </Row>

          <Container id="ticketDetails">
            <Row >
              <Col className="col-lg-3 col-sm-6"> <h4>Namn</h4>
                <p>
                  Axel Westerström
                </p>
              </Col>
              <Col className="col-lg-3 col-sm-6">
                <h4>Datum</h4>
                <p>
                  2022-06-23
                </p>
              </Col>
              <Col className="col-lg-3 col-sm-6">
                <h4>Avgång</h4>
                <p>
                  13.45
                </p>
              </Col>
              <Col className="col-lg-3 col-sm-6">
                <h4>Ankomst</h4>
                <p>
                  13.45
                </p>
              </Col>
            </Row>

            <Row>
              <Col className="col-lg-3 col-sm-6">
                <h4>Biljettyp</h4>
                <p>
                  2
                </p>
              </Col>
              <Col className="col-lg-3 col-sm-6">
                <h4>Spår</h4>
                <p>
                  5
                </p>
              </Col>
              <Col className="col-lg-3 col-sm-6">
                <h4>Vagn</h4>
                <p>
                  3
                </p>
              </Col>
              <Col className="col-lg-3 col-sm-6">
                <h4>Plats</h4>
                <p>
                  45
                </p>
              </Col>
            </Row>
          </Container>
          <Row >
            <Col className="qrCode">
              <QRCode
                size={150}
                value={"asdasadsadadsssf"}
              /></Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default TicketTemplate;
