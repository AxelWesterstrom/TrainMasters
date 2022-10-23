import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import QRCode from "react-qr-code"
import { useStates } from "../assets/helpers/states";

function showTicketTemplate({ interval}) {
  let s = useStates("booking")
  //let qrCodeValue = "Namn: " + t.person[interval].firstName + " " + t.person[interval].lastName + "\n " + t.person[interval].type + " \n Vagn: " + t.carriageNumber[interval] + " \n Plats: " + t.seatNumber[interval] + "\n Bokningsnummer: " + t.bookingNumber
  let qrCodeValue = "22144fdsf"
  return (
    <>
      <Container>
        <Container id="ticketBorder">
          <Row>
            <Col id="ticketTitel" >
              {//<h1>{t.departureStation} - {t.arrivalStation}</h1>
              }
            </Col>
          </Row>

          <Container id="ticketDetails">
            <Row >
              <Col className="col-lg-3 col-sm-6"> <h4>Namn</h4>
                <p>
                  {//{t.person[interval].firstName} {t.person[interval].lastName}
                  }
                </p>
              </Col>
              <Col className="col-lg-3 col-sm-6">
                <h4>Datum</h4>
                <p>
                  {//{new Date(t.date).toLocaleDateString('sv-SE')}
                  }
                </p>
              </Col>
              <Col className="col-lg-3 col-sm-6">
                <h4>Avgång</h4>
                <p>
                  {// {t.departureTime}
                  }
                </p>
              </Col>
              <Col className="col-lg-3 col-sm-6">
                <h4>Ankomst</h4>
                <p>
                  {// {t.arrivalTime}
                  }
                </p>
              </Col>
            </Row>

            <Row>
              <Col className="col-lg-3 col-sm-6">
                <h4>Biljettyp</h4>
                <p>
                  {// {t.person[interval].type}
                  }</p>
              </Col>
              <Col className="col-lg-3 col-sm-6">
                <h4>Tågnummer</h4>
                <p>
                  {//{t.trainNumber}
                  }
                </p>
              </Col>
              <Col className="col-lg-3 col-sm-6">
                <h4>Vagn</h4>
                <p>
                  {//{t.carriageNumber[interval]}
                  }
                </p>
              </Col>
              <Col className="col-lg-3 col-sm-6">
                <h4>Plats</h4>
                <p>
                  {//{t.seatNumber[interval]}
                  }
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