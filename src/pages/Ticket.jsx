import Header from "../components/Header";
import TicketTemplate from "../components/TicketTemplate";
import React from "react";
import styles from "../../public/css/ticket.css";

import { Row, Col, Button, Form, Container } from "react-bootstrap";


function Ticket() {
  return (
    <>
      <Row className="header">
        <Header />
      </Row>
      <Row>
        <TicketTemplate _ />
      </Row>
      <div className="d-flex justify-content-center">
        <Button className="ticketButton" type="submit">
          Fortsätt
        </Button>
      </div>
    </>

  );
}
export default Ticket;
