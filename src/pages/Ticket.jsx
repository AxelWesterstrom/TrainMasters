import Header from "../components/Header";
import TicketTemplate from "../components/TicketTemplate";
import React from "react";
import styles from "../../public/css/ticket.css";
import { useStates } from "../assets/helpers/states";
import { Row, Form, FormLabel, FormControl, Col, Container } from "react-bootstrap"; 4

function Ticket() {
  let log = useStates("login");
  let s = useStates("booking")

  function searchBooking() {

  }

  function typeOutTickets() {
    for (let i = 0; i < s.ticket.passenger.length; i++) {
      return <TicketTemplate /> 
    }
  }

  return (
    <>
      <Row className="header">
        <Header />
      </Row>

      <Container overflow="hidden">
        <Row >
          {!log.login
            ? <Container>
              <Row className="form-booking-number">
                <Col className="form-body" xs={12} md={10} lg={6}>
                  <Form className="booking-number-form" onSubmit={searchBooking} autoComplete="off">
                    <FormLabel>
                      <h2>Skriv in ditt bokningsnummer</h2>
                    </FormLabel>
                    <FormControl type="text" />
                  </Form>
                </Col>
              </Row>
            </Container>
            :
            <Row>
              <h1 className="booking-number">Bokningsnummer: 321494912489</h1>
              {typeOutTickets()}
            </Row>


          }
        </Row>
      </Container>
    </>
  );
}
export default Ticket;
