import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { useStates } from "../assets/helpers/states";
import { useState } from "react";



function PaymentMethod() {
  const [payment, setPayment] = useState();

  function paymentPopup() {

    if ({ payment } == "swish") {
      console.log("im SWISH WOOO")
      console.log({ payment })
    }
    else if ({ payment } == "kort") {
      console.log("im KORT WOOO")
      console.log({ payment })
    }
    else {
      
      return (
        alert("Välj betalsätt!  " + {payment})
        
      );
    }
  }

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
              {/* {["radio"].map((type) => (
                <div key={`${type}`} className="mb-3 custom-label">
                  <Form.Check
                    label="Swish"
                    name="paymentChoice"
                    type={type}
                    onChange={e=>setPayment(e.target.value)}
                    id={`${type}-swish`}
                  />
                  <Form.Check
                    label="Kort"
                    name="paymentChoice"
                    type={type}
                    onChange={e=>setPayment(e.target.value)}
                    id={`${type}-kort`}
                  />
                </div>
              ))} */}
              <Row className="d-flex p-2">
                <Col>
                  <input
                    type="radio"
                    className="custom-radio"
                    name="paymentChoice"
                    value="swish"
                    id="radio-swish"
                    onChange={(e) => setPayment(e.target.value)}
                  />
                </Col>
                <Col>
                  <label for="radio-swish">Swish</label>
                </Col>
              </Row>
              <Row className="d-flex p-2">
                <Col>
                  <input
                    type="radio"
                    className="custom-radio"
                    name="paymentChoice"
                    value="kort"
                    id="radio-kort"
                    onChange={(e) => setPayment(e.target.value)}
                  />
                </Col>
                <Col>
                  <label for="radio-kort">Kort</label>
                </Col>
              </Row>
            </Row>
            <Row>
              <Button
                className="custom-button paymentButton"
                type="button"
                onClick={paymentPopup}
              >
                Fortsätt
              </Button>
            </Row>
          </Col>
          <h1>{payment}</h1>
        </Form>
      </Container>
    </>
  );
}

export default PaymentMethod;
