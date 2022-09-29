import Header from "../components/Header";
import TicketTemplate from "../components/TicketTemplate";
import React from "react";
import styles from "../../public/css/ticket.css";


import { Row, Col, Button, Container } from "react-bootstrap";


function Ticket() {
  const isMyTicketPage = true; //added one variable to control the my-tickets button on the header
  return (
    <>
      <Row className="header">
        <Header isMyTicketPage={isMyTicketPage} />
      </Row>
      <Row>
        {Array(3).fill(<TicketTemplate />)}
      </Row>
      <Container className="d-flex justify-content-end p-4">
        <Button className="custom-button" type="submit">
          Fortsätt
        </Button>
      </Container>
    </>
  );
}
export default Ticket;
