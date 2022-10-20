import Header from "../components/Header";
import TicketTemplate from "../components/TicketTemplate";
import React from "react";
import { useState } from "react";
import styles from "../../public/css/ticket.css";
import { useStates } from "../assets/helpers/states";
import { Row, Form, FormLabel, FormControl, Col, Container, Button } from "react-bootstrap"; 4

function Ticket() {
  let log = useStates("login");
  let s = useStates("booking")
  let t = useStates("bookingNumber")
  const [bookNum, setBookNum] = useState("");


  let count = 0;
  s.ticket.passengers.map((x) => {
    count += x.count;
  });

  const list = []

  function searchDatabase(event) {
    event.preventDefault();
    getBookingInfoFromNumber()
  }

  function typeOutTickets() {
    for (let i = 0; i < count; i++) {
      list.push(<TicketTemplate interval={i} />)
    }
    return (<div>{list}</div>)
  };

  async function getBookingInfoFromNumber() {
    console.log("HERE");
    let bookingData = await (await fetch(`/api/bookingsWithJourneys?bookingNumber=${bookNum}`)).json();
    t.date = bookingData[0].date
    t.departureStation = bookingData[0].departureStationName
    t.departureTime = bookingData[0].departureStationDepartureTime
    t.arrivalStation = bookingData[0].arrivalStationName
    t.arrivalTime = bookingData[0].arrivalStationArrivalTime
    t.price = bookingData[0].price
    t.trainNumber = bookingData[0].trainNumber
    t.bookingNumber = bookingData[0].bookingNumber
    let bookingId = bookingData[0].bookingId
    for (let i = 0; i < bookingData.length; i++) {
      t.carriageNumber.push(bookingData[i].carriageNumber)
      t.seatNumber.push(bookingData[i].seatNumber)
    }

    let ticketData = await (await fetch(`/api/ticketWithPassenger?bookingId=${bookingId}`)).json();
    for (let i = 0; i < ticketData.length; i++) {
      t.person.push({ firstName: ticketData[i].firstName, lastName: ticketData[i].lastName, type: ticketData[i].type })
    }
    console.log(t);
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
              <h1 className="booking-number">Bokningsnummer: {s.ticket.bookingNumber}</h1>
              {typeOutTickets()}
            </Row>
          }
        </Row>
      </Container>
    </>
  );
}
export default Ticket;