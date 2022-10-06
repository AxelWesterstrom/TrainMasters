import Header from "../components/Header";
import React from "react";
import { Row, Col, Button, Form, Container } from "react-bootstrap";
import Traveler from "../components/Traveler";
import PaymentMethod from "../components/PaymentMethod";
import * as styles from "../../public/css/payment.css";

function Payment() {
  return (
    <>
      <container>
        <Row className="header">
          <Header />
        </Row>
        <Traveler> </Traveler>
        <PaymentMethod></PaymentMethod>
      </container>
    </>
  );
}

export default Payment;
