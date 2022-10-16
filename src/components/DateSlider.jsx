import { Container, Col, Row } from "react-bootstrap";
import "../../public/css/journey.css";
import { useStates } from "../assets/helpers/states";

function DateSlider() {
  let s = useStates("booking");

  function handleDateChange(change) {
    let today = new Date();
    let dateToChange = new Date(s.ticket.date);
    let newDate = dateToChange.setDate(dateToChange.getDate() + change);
    if (newDate < today) {
      newDate = today;
    }
    s.ticket.date = new Date(newDate).toLocaleDateString("sv-SE");
  }

  return (
    <Container className='custom-container'>
      <Row id='dateSlider' className='row d-flex align-item-center m-1 mb-2'>
        <Col className='col-3 d-flex justify-content-center'>
          <img
            alt='left-arrow'
            src='../images/arrow-left-date.svg'
            className='date-arrow-left'
            onClick={() => handleDateChange(-1)}
          />
        </Col>
        <Col className='col-6 d-flex justify-content-center align-items-center'>
          <p className='custom-label mb-0'>
            {new Date(s.ticket.date).toLocaleDateString("sv-SE")}
          </p>
        </Col>
        <Col className='col-3 d-flex justify-content-center'>
          <img
            alt='right-arrow'
            src='../images/arrow-right-date.svg'
            className='date-arrow-right'
            onClick={() => handleDateChange(1)}
          />
        </Col>
      </Row>
    </Container>
  );
}
export default DateSlider;
