import Header from "../components/Header";
import React from "react";
import { Container } from "react-bootstrap";
import Traveler from "../components/Traveler";
import PaymentMethod from "../components/PaymentMethod";
import * as styles from "../../public/css/payment.css";
import { useStates } from "../assets/helpers/states";
import { useNavigate } from "react-router";

function Payment() {
  let s = useStates("booking");
  const navigate = useNavigate();

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
  const goToFormerPage = () => {
    navigate("/anpassa-resa");
  };

  return (
    <>
      <Header />
      <div className="body">
        <div onClick={goToFormerPage}>
          <img
            src="../images/arrow-left.svg"
            className="mt-2 ms-3 back-button"
          />
        </div>
      </div>
      <Container>
        <Traveler></Traveler>
        <PaymentMethod></PaymentMethod>
      </Container>
    </>
  );
}

export default Payment;
