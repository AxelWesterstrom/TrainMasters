import Header from "../components/Header";
import TicketTemplate from "../components/TicketTemplate";
import React from "react";
import styles from "../../public/css/contact.css";


import { Row, Col, Button, Container } from "react-bootstrap";


function Contact() {
  return (
    <>
      <div className="contact-body">
        <div className="header">
          <Header />
        </div>
      </div>
    </>
  );
}
export default Contact;
