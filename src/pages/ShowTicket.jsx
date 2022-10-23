import Header from "../components/Header";
import ShowTicketTemplate from "../components/ShowTicketTemplate";
import React from "react";
import styles from "../../public/css/ticket.css";
import { useStates } from "../assets/helpers/states";
import { Row, Container } from "react-bootstrap";



function ShowTicket() {

  let s = useStates("booking");
  const list = []

  function typeOutTickets() {
    for (let i = 0; i < s.ticket.people.length; i++) {
      list.push(<ShowTicketTemplate interval={i} key={i} />)
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
          <Row>
            <h1 className="booking-number">Bokningsnummer: {s.ticket.bookingNumber}</h1>
            {typeOutTickets()}
          </Row>
        </Row>
      </Container>
    </>
  );
}
export default ShowTicket;