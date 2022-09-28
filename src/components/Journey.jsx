import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Journey(props) {
  let { journey, chosenJourney, setChosenJourney, handleClickedJourney } =
    props;

  let {
    startTime,
    trainSetId,
    departureOffsetA,
    arrivalOffsetB,
    departureTimeA,
    arrivalTimeB,
    journeyId
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
      let bistro = jsonData[0].hasBistro;
      setHasBistro(bistro === "0" || bistro === undefined ? false : true);
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
    <Container
      className='journeyItem mb-3'
      onClick={() => {
        handleClickedJourney(journey);
      }}
    >
      <Row className='p-2'>
        <Col className='col-6'>
          <p className='custom-text'>
            {departureTimeA} - {arrivalTimeB}
          </p>
        </Col>
        <Col className='col-6 d-flex justify-content-end'>
          <p className='custom-text'>fr. {price} kr</p>
        </Col>
      </Row>
      <Row className='p-2'>
        {!!hasHandicapSeats && (
          <Col className='col-2' id='wheelchair'>
            <img
              alt='wheelchair'
              className='custom-icon'
              src='../images/wheelchair.svg'
            />
          </Col>
        )}
        {!!hasBistro && (
          <Col className='col-2' id='knifeAndFork'>
            <img
              alt='knifeAndFork'
              className='custom-icon'
              src='../images/knife-and-fork.svg'
            />
          </Col>
        )}
        <Col className='col-2' id='wifi'>
          <img alt='wifi' className='custom-icon' src='../images/wifi.svg' />
        </Col>
        {!!isPetsAllowed && (
          <Col className='col-2' id='dog'>
            <img alt='dog' className='custom-icon' src='../images/dog.svg' />
          </Col>
        )}
      </Row>
      <Row className='p-2 mt-1'>
        <Col className='content-justify-start'>
          <p className='custom-text'>Tågnummer</p>
        </Col>
      </Row>
    </Container>
  );
}
export default Journey;
