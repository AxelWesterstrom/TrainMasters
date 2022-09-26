import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Journey(props) {
  let { journey } = props;
  let { startTime, trainSetId } = journey;
  const [carriages, setCarriages] = useState([]);
  let price = 350;
  let hasBistro = false;
  let hasHandicapSeat = true;
  let isPetsAllowed = true;

  useEffect(() => {
    async function fetchData() {
      let data = await fetch(
        `/api/carriagesWithSeats?trainSetId=${trainSetId}`
      );
      setCarriages(await data.json());
    }
    fetchData();
  }, []);

  return (
    <Container id='journeyItem'>
      <Row>
        <Col className='col-3'>
          <h4>{startTime}</h4>
        </Col>
        {/* <Col className='col-6 justify-content-start' id='clock'>
          <img alt='clock' src='clock.svg' width='100' height='100' />
  </Col>*/}
        <Col className='col-3 offset-6'>
          <h5>fr. {price} kr</h5>
        </Col>
      </Row>
      <Row className='mt-3 mb-3'>
        {hasHandicapSeat && (
          <Col className='col-1' id='wheelchair'>
            <img alt='wheelchair' src='wheelchair.svg' width='50' height='50' />
          </Col>
        )}
        {hasBistro && (
          <Col className='col-1' id='knifeAndFork'>
            <img
              alt='knifeAndFork'
              src='knife-and-fork.svg'
              width='50'
              height='50'
            />
          </Col>
        )}
        <Col className='col-1' id='wifi'>
          <img alt='wifi' src='wifi.svg' width='50' height='50' />
        </Col>
        {isPetsAllowed && (
          <Col className='col-1' id='dog'>
            <img alt='dog' src='dog.svg' width='50' height='50' />
          </Col>
        )}
        <Col className='col-5'></Col>
      </Row>
      <Row>
        <Col className='content-justify-start'>Tågnummer</Col>
      </Row>
    </Container>
  );
}
export default Journey;
