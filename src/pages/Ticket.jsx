import Header from "../components/Header";
import TicketTemplate from "../components/TicketTemplate";
import React from "react";
import styles from "../../public/css/ticket.css";
import { useStates } from "../assets/helpers/states";
import { Row, Form, FormLabel, FormControl, Col, Container } from "react-bootstrap"; 4

function Ticket() {
  let log = useStates("login");

  function searchBooking() {

  }

  function typeOutTickets() {
    const tickets = ["gh", "gl", "lkf", "sadasd"]
    return tickets.map((ticket) => <TicketTemplate />)
  }

  return (
    <>
      <Row className="header">
        <Header />
      </Row>

      <Container overflow="hidden">
        <Row >
          {!log.login
            ? <Container className="form-body">
              <Row className="form-booking-number" xs={12} md={10} lg={8}>
                <Form onSubmit={searchBooking} autoComplete="off">
                  <FormLabel>
                    <h1>Skriv in ditt bokningsnummer</h1>
                  </FormLabel>
                  <FormControl type="text" />
                </Form>
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
