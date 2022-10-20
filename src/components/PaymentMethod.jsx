import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Form, Button, Modal } from "react-bootstrap";
import { useStates } from "../assets/helpers/states";
import { useState } from "react";
import { updateDatabase } from "./SendToDatabase.js";
import { useNavigate } from "react-router-dom";

function PaymentMethod() {
  let log = useStates("login");
  let u = useStates("user");
  let s = useStates("booking");
  const [paymentDone, setPaymentDone] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(false);
  const navigate = useNavigate();


  const [value, setValue] = useState("");
  const [swish, setSwish] = useState(false);
  const [card, setCard] = useState(false);
  // const handleCloseSwish = () => {
  //   setSwish(false), updateDatabase(log, u, s);
  // };
  const handleCloseCard = () => {
    setCard(false), updateDatabase(log, u, s);
  };

  //move to "Fortsätt knapp"
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
    setSwish(false);
    event.preventDefault();
    if (phoneNumber !== "" && email !== "") {
      setPaymentDone(true);
      updateDatabase(log, u, s);
      handleMail();
      navigate("/mina-biljetter");
      //Clear global states
    }
  }

  async function handleMail() {
    await fetch("/api/mailer", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        date: new Date(s.ticket.date).toLocaleDateString("sv-SE"),
        chosenJourney: s.ticket.chosenJourney,
        totalPassengers: s.ticket.people.length,
        bookingsNumber: s.ticket.bookingNumber,
      }),
    });

  }

  return (
    <>
      <Container className="travelerContainer">
        <Row className="ms-2">
          <Col className="travelers">
            <p className="custom-label">Välj betalsätt</p>
          </Col>
        </Row>
        <Form className="paymentMethodForm">
          <Col>
            <Row>
              <Row className="d-flex p-2">
                <Col>
                  <Form.Check
                    type="radio"
                    className="custom-label"
                    name="paymentChoice"
                    value="swish"
                    id="radio-swish"
                    onChange={(e) => handlePaymentMethod(e)}
                  />
                </Col>
                <Col>
                  <label className="custom-label">Swish</label>
                </Col>
              </Row>
              <Row className="d-flex p-2">
                <Col>
                  <Form.Check
                    type="radio"
                    className="custom-label"
                    name="paymentChoice"
                    value="kort"
                    id="radio-kort"
                    onChange={(e) => handlePaymentMethod(e)}
                  />
                </Col>
                <Col>
                  <label className="custom-label">Kort</label>
                </Col>
              </Row>
            </Row>
            <Row>
              <Button
                type="button"
                className="custom-button paymentButton"
                onClick={(event) => paymentPopup(event)}
              >
                Betala
              </Button>
            </Row>
          </Col>
          <h1>{}</h1>
        </Form>
        {paymentDone && (
          <Button
            type="submit"
            className="custom-button paymentButton mt-2"
            onClick={(event) => {
              paymentCheck(event);
            }}
          >
            Fortsätt
          </Button>
        )}
      </Container>

      <Modal
        show={swish}
        onHide={() => {
          setSwish(false);
        }}
        className="modal-xl"
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Swish</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>E-post</Form.Label>
                <Form.Control
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="phone-Number">
                <Form.Label>Telefonnummer</Form.Label>
                <Form.Text></Form.Text>
                <Form.Control
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  required
                  type="tel"
                  pattern="[+]{1}[4]{1}[6]{1}[7]{1}[0-9]{8}"
                />
              </Form.Group>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="custom-button"
              type="submit"
              onClick={paymentCheck}
            >
              Fortsätt
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal
        show={card}
        onHide={() => {
          setCard(false);
        }}
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
                  <Form.Label>E-post</Form.Label>
                  <Form.Control type="email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="firstName">
                  <Form.Label>Förnamn</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="lastName">
                  <Form.Label>Efternamn</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Kortnummer:</Form.Label>
                  <Form.Control
                    id="kort"
                    type="tel"
                    inputmode="numeric"
                    pattern="[0-9\s]{13,19}"
                    autocomplete="cc-number"
                    maxlength="19"
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>CVC/CVV</Form.Label>
                  <Form.Control
                    id="cvv"
                    type="tel"
                    inputmode="numeric"
                    pattern="[0-9]{3}"
                    maxlength="3"
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
              Fortsätt
            </Button>
          </Modal.Footer>
        </Container>
      </Modal>
    </>
  );
}

export default PaymentMethod;
