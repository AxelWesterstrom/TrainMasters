import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Form, Button, Modal } from "react-bootstrap";
import { useStates } from "../assets/helpers/states";
import { useState } from "react";

function PaymentMethod() {
  //   const [payment, setPayment] = useState();

  // function paymentPopup() {

  // if ({ payment } == "swish") {
  //   console.log("im SWISH WOOO")
  //   console.log({ payment })
  // }
  // else if ({ payment } == "kort") {
  //   console.log("im KORT WOOO")
  //   console.log({ payment })
  // }
  // else {

  //   return (
  //     alert("Välj betalsätt!  " + {payment})

  //   );
  // }
  // }
  const [value, setValue] = useState("");
  const [swish, setSwish] = useState(false);
  const [card, setCard] = useState(false);
  const handleCloseSwish = () => setSwish(false);
  const handleCloseCard = () => setCard(false);
  const handlePaymentMethod = (e) => {
    const id = e.target.id;
    console.log(value);
    if (id == "radio-swish") {
      setValue("swish");
    }
    if (id == "radio-kort") {
      setValue("kort");
    }
  };
  function paymentPopup() {
    if (value == "swish") {
      setSwish(true);
    } else if (value == "kort") {
      setCard(true);
    } else {
      console.log("selected payment type (bug)");
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
              <Row className="d-flex p-2">
                <Col>
                  <input
                    type="radio"
                    className="custom-radio"
                    name="paymentChoice"
                    value="swish"
                    id="radio-swish"
                    onChange={(e) => handlePaymentMethod(e)}
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
                    onChange={(e) => handlePaymentMethod(e)}
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
                onClick={() => paymentPopup()}
              >
                Fortsätt
              </Button>
            </Row>
          </Col>
          <h1>{}</h1>
        </Form>
      </Container>
      <Modal show={swish} onHide={handleCloseSwish} className="modal-xl">
        <Modal.Header closeButton>
          <Modal.Title>Swish</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Skriv ditt email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="phone-Number">
                <Form.Label>Telefon nummer</Form.Label>
                <Form.Text></Form.Text>
                <Form.Control
                  type="tel"
                  pattern="[+]{1}[4]{1}[6]{1}[7]{1}[0-9]{8}"
                  placeholder="+467xxxxxxxx"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button className="custom-button" onClick={handleCloseSwish}>
            Stäng
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={card}
        onHide={handleCloseCard}
        className="modal-xl paymentModal"
      >
        <Container>
          <Modal.Header closeButton>
            <Modal.Title>Kort</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Form>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>Förnamn</Form.Label>
                    <Form.Control type="text" placeholder="Förnamn" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Efternamn</Form.Label>
                    <Form.Control type="text" placeholder="Efternamn" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label for="kort">Kort nummer:</Form.Label>
                    <Form.Control
                      id="kort"
                      type="tel"
                      inputmode="numeric"
                      pattern="[0-9\s]{13,19}"
                      autocomplete="cc-number"
                      maxlength="19"
                      placeholder="xxxx xxxx xxxx xxxx"
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label for="cvv">CVV</Form.Label>
                    <Form.Control
                      id="cvv"
                      type="tel"
                      inputmode ="numeric"
                      pattern="[0-9]{3}"
                      maxlength="3"
                      placeHolder="xxx"
                    ></Form.Control>
                  </Form.Group>
                </Form>
              </Form>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button className="custom-button" onClick={handleCloseCard}>
              Betala
            </Button>
          </Modal.Footer>
        </Container>
      </Modal>
    </>
  );
}

export default PaymentMethod;
