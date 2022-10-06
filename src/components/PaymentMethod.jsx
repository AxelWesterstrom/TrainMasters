import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Form } from "react-bootstrap";

function PaymentMethod() {
  return (
    <>
      <Container className="travelerContainer">
        <Row>
          <Col className="travelers">
            <p className="custom-label">Välj betalsätt</p>
          </Col>
        </Row>
        <Form className="paymentMethodForm">
          <Col>
            <Row>
              <Col>
                <label className="radioLabel" for="choice-Swish">
                  Swish
                </label>
                <input
                  className="custom-radio"
                  type="radio"
                  name="choice"
                  value="Swish"
                />
                <label className="radioLabel" for="choice-Kort">
                  Kort
                </label>
                <input
                  className="custom-radio"
                  type="radio"
                  name="choice"
                  value="Kort"
                />
              </Col>
            </Row>
          </Col>
        </Form>
      </Container>
    </>
  );
}

export default PaymentMethod;
