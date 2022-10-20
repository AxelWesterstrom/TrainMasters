import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Form, Button, Modal } from "react-bootstrap";
import { useStates } from "../assets/helpers/states";
import { useState } from "react";
import { updateDatabase } from "./SendToDatabase.js";

function PaymentMethod() {
  let log = useStates("login");
  let u = useStates("user");
  let s = useStates("booking");
  const [paymentDone, setPaymentDone] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(false);
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
  const handleCloseSwish = () => {
    setSwish(false), updateDatabase(log, u, s);
  };
  const handleCloseCard = () => {
    setCard(false), updateDatabase(log, u, s);
  }; //move to "Fortsätt knapp"
  const handlePaymentMethod = (e) => {
    const id = e.target.id;
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
      alert("välj betalsätt");
    }
  }



  async function paymentCheck(event) {
    event.preventDefault();
    if (paymentDone) {
      handleMail(e.mail)
      updateDatabase()
    }
  }

  async function handleMail(e) {
    e.preventDefault;
    await fetch("/api/mailer", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        date: new Date(s.ticket.date).toLocaleDateString("sv-SE"),
        chosenJourney: s.ticket.chosenJourney,
        totalPassengers: s.ticket.people.length,
        bookingsNumber: s.ticket.bookingNumber
      })
    });
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
                type="submit"
                className="custom-button paymentButton"
                onClick={() => paymentPopup()}
              >
                Betala
              </Button>
            </Row>
          </Col>
          <h1>{ }</h1>
        </Form>
        <Button
          type="submit"
          className="custom-button paymentButton"
          onClick={(event) => { paymentCheck(event) }}
        >
          Fortsätt
        </Button>
      </Container>

      <Modal show={swish} onHide={() => { setSwish(false) }} className="modal-xl">
        <Form onSubmit={(event) => { paymentCheck(event) }}>
          <Modal.Header closeButton>
            <Modal.Title>Swish</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={event => setEmail(event.target.value)}
                  type="email"
                  placeholder="Skriv ditt email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="phone-Number">
                <Form.Label>Telefon nummer</Form.Label>
                <Form.Text></Form.Text>
                <Form.Control
                  onChange={event => setPhoneNumber(event.target.value)}
                  required
                  type="tel"
                  pattern="[+]{1}[4]{1}[6]{1}[7]{1}[0-9]{8}"
                  placeholder="+467xxxxxxxx"
                />
              </Form.Group>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="custom-button"
              type="submit"
              onClick={handleCloseSwish}
            >
              Betala
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal
        show={card}
        onHide={() => { setCard(false) }}
        className="modal-xl paymentModal"
      >
        <Container>
          <Modal.Header closeButton>
            <Modal.Title>Kort</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Email" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="firstName">
                  <Form.Label>Förnamn</Form.Label>
                  <Form.Control type="text" placeholder="Förnamn" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="lastName">
                  <Form.Label>Efternamn</Form.Label>
                  <Form.Control type="text" placeholder="Efternamn" required />
                </Form.Group>
                <Form.Group>
                  <Form.Label for="kort">Kort nummer:</Form.Label>
                  <Form.Control
                    required
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
                    required
                    id="cvv"
                    type="tel"
                    inputmode="numeric"
                    pattern="[0-9]{3}"
                    maxlength="3"
                    placeHolder="xxx"
                  ></Form.Control>
                </Form.Group>
              </Form>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="custom-button"
              type="submit"
              onClick={handleCloseCard}
            >
              Betala
            </Button>
          </Modal.Footer>
        </Container>
      </Modal>
    </>
  );
}

export default PaymentMethod;
