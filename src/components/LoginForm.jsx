import React from "react";
import { useState } from "react";
import { Container, Row, Col, Form, Button, FormLabel, FormControl } from "react-bootstrap";
import styles from "../../public/css/login.css";

function LoginForm() {


  return (LoginForm = (
    <>
      <Container className="loginform-body">
        <Row className="form-row">
          <Col className="col-2"></Col>
          <Col className="col-10 login-form-col">
            <Form.Group className="login-form">
              <Form autoComplete="off">
                <FormLabel className="loginform">Användarnamn </FormLabel>
                <FormControl type="text" />
              </Form>
              <Form style={{ paddingBottom: "20px" }}>
                <FormLabel>Lösenord </FormLabel>
                <FormControl type="password" />
              </Form>

              <Button className="custom-button">Logga in</Button>
            </Form.Group>
          </Col>
          <Col className="col-2"></Col>
        </Row>
      </Container>
    </>
  ));

}

export default LoginForm