import Header from "../components/Header";
import React from "react";
import { Container } from "react-bootstrap";
import Traveler from "../components/Traveler";
import PaymentMethod from "../components/PaymentMethod";
import * as styles from "../../public/css/payment.css";
import { useNavigate } from "react-router";

function Payment() {
  const navigate = useNavigate();
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
