import React from "react";
import { useState } from "react";
import { Container, Row, Col, Form, Button, FormLabel, FormControl, Modal } from "react-bootstrap";
import styles from "../../public/css/login.css";
import { useNavigate } from "react-router-dom";
import { useStates } from "../assets/helpers/states";

function LoginForm() {

  let log = useStates("login");
  let u = useStates("user");
  const navigate = useNavigate();

  let l = useStates({
    email: "",
    password: ""
  });

  const handleClose = () => setShow(false);
  const [errorMessage, setErrorMessage] = useState("");

  function login(event) {
    event.preventDefault();
    loginAttempt()
  }

  async function loginAttempt() {
    const customer = await (await fetch(`/api/customers?email=${l.email}`)).json();
    if (l.email.length == 0 || l.password.length == 0) {
      setErrorMessage("Fyll i både email och lösenord  ");
      setShow(true);
    } else if (customer == 0) {
      setErrorMessage("Ingen matchning ");
      setShow(true);
    }
    else {
      const customerInfo = Object.values(customer)
      const correctPassword = customerInfo[0].password
      if (correctPassword == l.password) {
        setErrorMessage("Välkommen!");
        setShow(true);
        log.login = "true";
        u.email = l.email;
        navigate("/");
      } else {
        setErrorMessage("Fel e-post eller lösenord ");
        setShow(true);
      }
    }
  }

  function goToRegister() {
    navigate("/skapa-konto");
  }
  const [show, setShow] = useState();
  

  return (LoginForm = (
    <>
      <Container className="loginform-body">
        <Container className="login">
          <Row className="form-row">
            <Col className=" login-form-col">
              <Form.Group className="login-form">
                <Form onSubmit={login} autoComplete="off">
                  <FormLabel className="login-label">E-postadress </FormLabel>
                  <FormControl type="email" {...l.bind("email")} />
                  <FormLabel className="login-label">Lösenord </FormLabel>
                  <FormControl type="password" {...l.bind("password")} />
                  <Button type="submit" className="custom-button" style={{ marginTop: 20 }}>Logga in</Button>
                  <Button className="custom-button" onClick={goToRegister} style={{ marginTop: 20 }}>Skapa Ett Konto</Button>
                </Form>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton></Modal.Header>
                  <Modal.Body>
                    <p className='custom-label'>{errorMessage}</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className='custom-button' onClick={handleClose}>
                      Stäng
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  ));

}

export default LoginForm