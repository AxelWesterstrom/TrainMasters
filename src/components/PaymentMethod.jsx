import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Form, Button } from "react-bootstrap";

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
              {["radio"].map((type) => (
                <div key={`${type}`} className="mb-3 custom-label">
                  <Form.Check
                    label="Swish"
                    name="group1"
                    type={type}
                    onChange={(e) => setSwishPayment(e.target.value)}
                    id={`${type}-swish`}
                  />
                  <Form.Check
                    label="Kort"
                    name="group1"
                    type={type}
                    onChange={(e) => setCardPayment(e.target.value)}
                    id={`${type}-kort`}
                  />
                </div>
              ))}
            </Row>
          </Col>
            <Button className="custom-button paymentButton" type="submit">
              Fortsätt
            </Button>
        </Form>
      </Container>
    </>
  );
}

export default PaymentMethod;
