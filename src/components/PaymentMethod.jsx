import React from "react";
import { Row, Col, Container, Form, Button, Modal } from "react-bootstrap";
import { useStates } from "../assets/helpers/states";
import { useState } from "react";
import { updateDatabase, getTicket } from "../assets/helpers/SendToDatabase.js";
import { useNavigate } from "react-router-dom";

function PaymentMethod() {
  let log = useStates("login");
  let u = useStates("user");
  let s = useStates("booking");
  let t = useStates("bookingNumber");
  const [paymentDone, setPaymentDone] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(false);
  const navigate = useNavigate();
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let regexPhone = /[0]{1}[7]{1}[0|2|3|6|9]{1}[0-9]{7}/;

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
    if (
      // phoneNumber.match(regexPhone) &&
      email.match(regexEmail)
    ) {
      setPaymentDone(true);
      updateDatabase(log, u, s);
      handleMail();

      navigate("/biljetter");
    }
  }
  // } else if (!email.match(regexEmail) || email == null) {
  //   alert("Ogiltlig Epost");
  //   paymentPopup();
  // } else if (!phoneNumber.match(regexPhone) || phoneNumber == "") {
  //   alert("Ogiltlig telefonnummer");
  //   paymentPopup();
  // } else if (phoneNumber == "" || email == "") {
  //   alert("Fyll i alla fält");
  //   paymentPopup();
  // } else {
  //   alert("Fyll i epost och telefonnummer");
  //   paymentPopup();
  // }
  // }
  // async function paymentCheckCard(event) {
  //   setCard(false);
  //   event.preventDefault();
  //   if (!email == "") {
  //     setPaymentDone(true);
  //     updateDatabase(log, u, s);
  //     handleMail();
  //     navigate("biljetter");
  //   }
  // }

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
        <Form onSubmit={paymentCheck}>
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
                <Form.Control
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  required
                  type="tel"
                  pattern="[0]{1}[7]{1}[0|2|3|6|9]{1}[0-9]{7}"
                  maxlength="10"
                />
              </Form.Group>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button className="custom-button" type="submit">
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
        {" "}
        <Form onSubmit={paymentCheck}>
          <Container>
            <Modal.Header closeButton>
              <Modal.Title>Kort</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>E-post</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="firstName">
                  <Form.Label>Förnamn</Form.Label>
                  <Form.Control
                    required
                    type="text"
                   
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="lastName">
                  <Form.Label>Efternamn</Form.Label>
                  <Form.Control
                  required
                    type="text"
                  
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Kortnummer:</Form.Label>
                  <Form.Control
                    required
                    id="kort"
                    type="card"
                    inputmode="numeric"
                    pattern="[0-9\s]{13,19}"
                    autoComplete="cc-number"
                    maxLength="19"
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>CVC/CVV</Form.Label>
                  <Form.Control
                    required
                    id="cvv"
                    type="tel"
                    inputmode="numeric"
                    pattern="[0-9]{3}"
                    maxLength="3"
                  ></Form.Control>
                </Form.Group>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button className="custom-button" type="submit">
                Fortsätt
              </Button>
            </Modal.Footer>
          </Container>
        </Form>
      </Modal>
    </>
  );
}

export default PaymentMethod;
