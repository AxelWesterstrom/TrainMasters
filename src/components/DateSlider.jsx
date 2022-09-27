import { useState } from "react";
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
    <Row
      id='dateSlider'
      className='row d-flex justify-content-center text-center'
    >
      <Col className='col-2 item-justify-end'>
        <img
          alt='left-arrow'
          src='../images/left-arrow.png'
          width='150'
          height='100'
          onClick={() => handleDateChange(-1)}
        />
      </Col>
      <Col className='col-4 mt-4'>
        <h3>{date}</h3>
      </Col>
      <Col className='col-2 item-justify-start'>
        <img
          alt='right-arrow'
          src='../images/right-arrow.png'
          width='150'
          height='100'
          onClick={() => handleDateChange(1)}
        />
      </Col>
    </Row>
  );
}
export default DateSlider;
