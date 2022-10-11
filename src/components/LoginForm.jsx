import React from "react";
import { useState } from "react";
import { Container, Row, Col, Form, Button, FormLabel, FormControl } from "react-bootstrap";
import styles from "../../public/css/login.css";
import { useStates } from "../assets/helpers/states";

function LoginForm() {

  let l = useStates({
    email: "",
    password: ""
  });


  function login(event) {
    event.preventDefault();
    console.log("Send via API", l.email, l.password);

  }

  return (LoginForm = (
    <>
      <Container className="loginform-body">
        <Row className="form-row">
          <Col className="col-2"></Col>
          <Col className="col-10 login-form-col">
            <Form.Group className="login-form">
              <Form onSubmit={login} autoComplete="off">
                <FormLabel className="loginform">Email </FormLabel>
                <FormControl type="email" {...l.bind("email")} />


                <FormLabel>Lösenord </FormLabel>
                <FormControl type="password" {...l.bind("password")} />


                <Button type="submit" className="custom-button">Logga in</Button>
              </Form>
            </Form.Group>
          </Col>
          <Col className="col-2"></Col>
        </Row>
      </Container>
    </>
  ));

}

export default LoginForm