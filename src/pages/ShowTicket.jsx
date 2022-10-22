import Header from "../components/Header";
import ShowTicketTemplate from "../components/ShowTicketTemplate";
import React from "react";
import { useState } from "react";
import styles from "../../public/css/ticket.css";
import { useStates } from "../assets/helpers/states";
import { Row, Form, FormLabel, FormControl, Col, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



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

// {!log.login
//   ? <Container>
//     <Row className="form-booking-number">
//       <Col className="form-body" xs={12} md={10} lg={6}>
//         <Form className="booking-number-form" onSubmit={searchDatabase} autoComplete="off">
//           <FormLabel>
//             <h2>Skriv in ditt bokningsnummer</h2>
//           </FormLabel>
//           <FormControl type="text" onChange={e => setBookNum(e.target.value)} value={bookNum} />
//           <Button type="submit" className="custom-button" style={{ marginTop: 20 }}>Sök bokning</Button>
//         </Form>
//       </Col>
//     </Row>
//   </Container>
//   :
export default ShowTicket;