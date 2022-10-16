import Header from "../components/Header";
import TicketTemplate from "../components/TicketTemplate";
import React from "react";
import styles from "../../public/css/ticket.css";
import { useStates } from "../assets/helpers/states";
import { Row, Col, Button, Container, Form, FormLabel, FormControl } from "react-bootstrap"; 4

function Ticket() {
  let log = useStates("login");

  function searchBooking() {

  }

  return (
    <>
      <Row className="header">
        <Header />
      </Row>
      <Row>
        {!log.login
          ? <Form onSubmit={searchBooking} autoComplete="off">
            <FormLabel className="login-label">Bokningsnummer </FormLabel>
            <FormControl type="text" />
          </Form>
          : Array(3).fill(<TicketTemplate />)
        }
      </Row>
    </>
  );
}
export default Ticket;
