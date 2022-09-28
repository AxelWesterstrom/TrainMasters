import Header from "../components/Header";
import TicketTemplate from "../components/TicketTemplate";
import React from "react";
import styles from "../../public/css/ticket.css";

import { Row, Col, Button, Form, Container } from "react-bootstrap";


function Ticket() {
  const isMyTicketPage = true; //added one variable to control the my-tickets button on the header
  return (
    <>
      <Row className="header">
        <Header isMyTicketPage={isMyTicketPage} />
      </Row>
      <Row>
        <TicketTemplate _ />
      </Row>
      <div className="d-flex justify-content-center">
        <Button className="custom-button" type="submit">
          Fortsätt
        </Button>
      </div>
    </>
  );
}
export default Ticket;
