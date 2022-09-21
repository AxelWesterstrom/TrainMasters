import Header from "../components/Header";
import React from "react";
import styles from "../../public/css/home.css";
import { Row, Col, Button, Form, Container } from "react-bootstrap";


function Ticket() {
  return (
    <>
      <div className="ticket">
        <div className="header">
          <Header />
        </div>
        <div className="main">
          <div className="d-flex justify-content-center mt-5 pt-5">
            <Container className="p-1 m-1">
              <Container className="ticketBorder">
                <Row ></Row>
                <Row>
                  <Col>Biljett</Col>
                </Row>
              </Container>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}
export default Ticket;
