import Header from "../components/Header";
import React from "react";
import { Row, Col, Button, Form, Container } from "react-bootstrap";
import Traveler from "../components/Traveler";
import PaymentMethod from "../components/PaymentMethod";
import * as styles from "../../public/css/payment.css";
import { useStates } from "../assets/helpers/states";

function Payment() {
  let s = useStates("booking");

  // let count = 0;
  // s.ticket.passengers.map((x) => {
  //   count += x.count;
  // });

  // function typeOutTravelers() {
  //   for (let i = 0; i < count; i++) {
  //     list.push(<Traveler/>);
  //   }
  //   return <div>{list}</div>;
  // }
  return (
    <>
      <Header />
      <Container>
        <Traveler></Traveler>
        <PaymentMethod></PaymentMethod>
      </Container>
    </>
  );
}

export default Payment;
