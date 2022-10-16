import React from "react";
import { useState } from "react";
import { Container, Row, Col, Form, Button, FormLabel, FormControl, Modal } from "react-bootstrap";
import styles from "../../public/css/login.css";
import { useNavigate } from "react-router-dom";
import { useStates } from "../assets/helpers/states";
import Header from "../components/Header";

function RegisterForm() {

  const navigate = useNavigate();
  let log = useStates("login");
  let u = useStates("user");
  
  let l = useStates({
    email: "",
    password: "",
    passwordCheck: ""
  });
  const handleClose = () => setShow(false);
  const [show, setShow] = useState();
  
  const [errorMessage, setErrorMessage] = useState("");
  
  function register(event) {
    event.preventDefault();
    registerAttempt()
  }

  async function registerAttempt() {
    let email = await (await fetch(`/api/customers?email=${l.email}`)).json();
    console.log(email);
    if (l.email.length == 0 || l.password.length == 0 || l.passwordCheck.length == 0) {
      setErrorMessage("Alla fält måste fyllas i");
      setShow(true);
    }
    else if (email.length !== 0) {
      setErrorMessage("E-postadressen används redan");
      setShow(true);
    } else if (email.length == 0 && l.password !== l.passwordCheck) {
      setErrorMessage("Lösenorden matchade inte");
      setShow(true);
    } else if (email.length == 0 && l.password == l.passwordCheck) {
      setErrorMessage("Grattis! Du skapade ett konto, välkommen");
      setShow(true);
      addUser();
    }
  }

  function addUser() {
    log.login = "true";
    u.email = l.email;
    navigate("/");
  }
  

  return (RegisterForm = (
    <>
      <div className="login-body">
        <div className="header">
          <Header />
        </div>
        <div>
          <Container className="loginform-body">
            <Container className="login">
              <Row className="form-row">
                <Col className=" login-form-col">
                  <Form.Group className="login-form">
                    <Form onSubmit={register} autoComplete="off">
                      <FormLabel className="login-label">E-postadress </FormLabel>
                      <FormControl type="email" {...l.bind("email")} />
                      <FormLabel className="login-label">Lösenord </FormLabel>
                      <FormControl type="password" {...l.bind("password")} />
                      <FormLabel className="login-label">Bekräfta lösenord </FormLabel>
                      <FormControl type="password" {...l.bind("passwordCheck")} />
                      <Button type="submit" className="custom-button" style={{ marginTop: 20 }}>Skapa Konto</Button>
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
        </div>
      </div>

    </>
  ));

}

export default RegisterForm