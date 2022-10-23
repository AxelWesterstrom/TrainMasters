import Header from "../components/Header";
import TicketTemplate from "../components/TicketTemplate";
import React from "react";
import { useState } from "react";
import styles from "../../public/css/ticket.css";
import { useStates } from "../assets/helpers/states";
import { Row, Form, FormLabel, FormControl, Col, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { updateDatabase, getTicket, getAllTickets } from "../assets/helpers/SendToDatabase.js";

function Ticket() {
  const [bookNum, setBookNum] = useState("");
  const [infoFromDatabase, setInfoFromDatabase] = useState(false);
  let log = useStates("login");
  let u = useStates("user");
  let s = useStates("booking");
  let t = useStates("bookingNumber");
  const list = []
  const [allTickets, setAllTickets] = useState([])


  function typeOutAllTickets(allTickets) {
    for (let ticket of allTickets) {
      for (let i = 0; i < ticket.person.length; i++) {
        console.log(allTickets.indexOf(ticket) + "-" + i);
        list.push(<TicketTemplate ticket={ticket} interval={i} key={allTickets.indexOf(ticket) + "-" + i} />)
      }
    }
    return (<div>{list}</div>)
  };
  function typeOutTicket() {
    for (let i = 0; i < t.person.length; i++) {
      list.push(<TicketTemplate interval={i} key={i} ticket={t} />)
    }
    return (<div>{list}</div>)
  };

  function getTicketInput(event) {
    event.preventDefault();
    getTicketByNumber()

  }

  async function getTicketByNumber() {
    await getTicket(log, t, u, bookNum);
    setInfoFromDatabase(true);
  }

  function getLoggedInTickets() {
    getTicketByUser()
  }

  async function getTicketByUser() {
    let tickets = await getAllTickets(log, t, u);
    setAllTickets(tickets)
  }

  if (!log.login) {
    return (
      <>
        <Row className="header">
          <Header />
        </Row>

        <Container overflow="hidden">
          <Row >
            {!infoFromDatabase
              ? <Container>
                <Row className="form-booking-number">
                  <Col className="form-body" xs={12} md={10} lg={6}>
                    <Form className="booking-number-form" onSubmit={getTicketInput} autoComplete="off">
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
                {typeOutTicket()}
              </Row>
            }
          </Row>
        </Container>
      </>
    );
  }
  return (
    <>
      <Row className="header">
        <Header />
      </Row>
      <Container overflow="hidden">
        <Row >
          <Row>

            {getLoggedInTickets()}
          </Row>
        </Row>
      </Container>
      <Container>
        {typeOutAllTickets(allTickets)}
      </Container>
    </>
  );
}

export default Ticket;