import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Journey(props) {
  let { journey } = props;
  let {
    startTime,
    trainSetId,
    departureOffsetA,
    arrivalOffsetB,
    departureTimeA,
    arrivalTimeB
  } = journey;
  let price = 350;
  const [hasBistro, setHasBistro] = useState(true);
  const [hasHandicapSeats, setHasHandicapSeats] = useState(true);
  const [isPetsAllowed, setIsPetsAllowed] = useState(true);

  useEffect(() => {
    async function fetchData() {
      let data = await fetch(
        `/api/trainSetWithSpecialSeatInfo?trainSetId=${trainSetId}`
      );

      let jsonData = await data.json();
      console.log(jsonData);
      let bistro = jsonData[0].hasBistro;
      console.log("Bistro", bistro);
      setHasBistro(bistro === "0" || bistro === undefined ? false : true);
      console.log(hasBistro);
      let handicapSeats = jsonData[0].hasHandicapSeats;
      setHasHandicapSeats(
        handicapSeats === "0" || handicapSeats === undefined ? false : true
      );
      let petsAllowed = jsonData[0].isPetsAllowed;
      setIsPetsAllowed(
        petsAllowed === "0" || petsAllowed === undefined ? false : true
      );
    }
    fetchData();
  }, []);

  return (
    <Container id='journeyItem'>
      <Row>
        <Col className='col-3'>
          <h4>
            {departureTimeA} - {arrivalTimeB}
          </h4>
        </Col>
        {/* <Col className='col-6 justify-content-start' id='clock'>
          <img alt='clock' src='clock.svg' width='100' height='100' />
  </Col>*/}
        <Col className='col-3 offset-6'>
          <h5>fr. {price} kr</h5>
        </Col>
      </Row>
      <Row className='mt-3 mb-3'>
        {!!hasHandicapSeats && (
          <Col className='col-1' id='wheelchair'>
            <img alt='wheelchair' src='../images/wheelchair.svg' width='50' height='50' />
          </Col>
        )}
        {!!hasBistro && (
          <Col className='col-1' id='knifeAndFork'>
            <img
              alt='knifeAndFork'
              src='../images/knife-and-fork.svg'
              width='50'
              height='50'
            />
          </Col>
        )}
        <Col className='col-1' id='wifi'>
          <img alt='wifi' src='../images/wifi.svg' width='50' height='50' />
        </Col>
        {!!isPetsAllowed && (
          <Col className='col-1' id='dog'>
            <img alt='dog' src='../images/dog.svg' width='50' height='50' />
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
