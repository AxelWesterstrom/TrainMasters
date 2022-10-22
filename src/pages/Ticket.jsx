import Header from "../components/Header";
import TicketTemplate from "../components/TicketTemplate";
import React from "react";
import { useState } from "react";
import styles from "../../public/css/ticket.css";
import { useStates } from "../assets/helpers/states";
import { Row, Form, FormLabel, FormControl, Col, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Ticket() {
  let log = useStates("login");
  const list = []
  function typeOutTickets() {
    for (let i = 0; i < t.person.length; i++) {
      list.push(<TicketTemplate interval={i} key={i} />)
    }
    return (<div>{list}</div>)
  };

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
                  <Form className="booking-number-form" onSubmit={searchDatabase} autoComplete="off">
                    <FormLabel>
                      <h2>Skriv in ditt bokningsnummer</h2>
                    </FormLabel>
                    <FormControl type="text" onChange={e => setBookNum(e.target.value)} value={bookNum} />
                    <Button type="submit" className="custom-button" style={{ marginTop: 20 }}>Sök bokning</Button>
                  </Form>
                </Col>
              </Row>
            </Container>
            :
            <Row>
              <h1 className="booking-number">Bokningsnummer: {t.bookingNumber}</h1>
              {typeOutTickets()}
            </Row>
          }
        </Row>
      </Container>
    </>
  );
}

export default Ticket;