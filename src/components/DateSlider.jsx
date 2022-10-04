import { useState } from "react";
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../../public/css/journey.css";

function DateSlider(props) {
  const { date, setDate } = props;

  function handleDateChange(change) {
    let dateToChange = new Date(date);
    let newDate = dateToChange.setDate(dateToChange.getDate() + change);
    let d = new Date(newDate);
    let dateToSet = formatDate(d);
    setDate(dateToSet);
  }

  function formatDate(date) {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  return (
    <Container className="custom-container">
      <Row id="dateSlider" className="row d-flex align-item-center m-1">
        <Col className="col-3 d-flex justify-content-center">
          <img
            alt="left-arrow"
            src="../images/left-arrow.png"
            className="date-arrow-left"
            onClick={() => handleDateChange(-1)}
          />
        </Col>
        <Col className="col-6 d-flex justify-content-center align-items-center">
          <p className="custom-label">{date}</p>
        </Col>
        <Col className="col-3 d-flex justify-content-center">
          <img
            alt="right-arrow"
            src="../images/right-arrow.png"
            className="date-arrow-right"
            onClick={() => handleDateChange(1)}
          />
        </Col>
      </Row>
    </Container>
  );
}
export default DateSlider;
