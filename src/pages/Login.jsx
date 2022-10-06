import Header from "../components/Header";
import TicketTemplate from "../components/TicketTemplate";
import React from "react";
import styles from "../../public/css/login.css";


import { Row, Col, Button, Container } from "react-bootstrap";
import LoginForm from "../components/LoginForm";


function Login() {
  return (
    <>
      <div className="login-body">
        <div className="header">
          <Header />
        </div>
        <div>
          <LoginForm />
        </div>
      </div>
    </>
  );
}
export default Login;
