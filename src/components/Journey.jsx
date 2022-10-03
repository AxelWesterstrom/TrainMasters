import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import calculateTicketPrice from "./calculateTicketPrice";
import calculateOccupancy from "./calculateOccupancy";

function Journey(props) {
  let {
    date,
    weekday,
    journey,
    chosenJourney,
    setChosenJourney,
    handleClickedJourney
  } = props;

  let {
    startTime,
    trainSetId,
    departureOffsetA,
    arrivalOffsetB,
    departureTimeA,
    arrivalTimeB,
    journeyId
  } = journey;
  const [price, setPrice] = useState();
  const [hasBistro, setHasBistro] = useState(false);
  const [hasHandicapSeats, setHasHandicapSeats] = useState(true);
  const [isPetsAllowed, setIsPetsAllowed] = useState(true);
  const [occupancy, setOccupancy] = useState();
  const [numberOfSeats, setNumberOfSeats] = useState();

  useEffect(() => {
    async function fetchData() {
      let fetchedData;
      try {
        fetchedData = await fetch(
          `/api/seatsInTrainSetWithSeatInfo?trainSetId=${trainSetId}`
        );
      } catch (e) {
        console.error("error ", code);
      }

      let data = await fetchedData.json();
      data = data[0];
      setNumberOfSeats(data.numberOfSeats);

      let bistro = data.hasBistro;
      setHasBistro(bistro === "0" || bistro === undefined ? false : true);
      let handicapSeats = data.hasHandicapSeats;
      setHasHandicapSeats(
        handicapSeats === "0" || handicapSeats === undefined ? false : true
      );
      let petsAllowed = data.petsAllowed;
      setIsPetsAllowed(
        petsAllowed === "0" || petsAllowed === undefined ? false : true
      );
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      let occupiedSeatsData, occupiedSeats;
      try {
        occupiedSeatsData = await fetch(
          `/api/occupiedSeatsWithDateAndJourneyAndTrainSet?date=${date}&journeyId=${journeyId}&trainSetId=${trainSetId}`
        );
      } catch (e) {
        console.error("error ", code);
      }
      let occupiedSeatsDataJson = await occupiedSeatsData.json();
      occupiedSeats =
        occupiedSeatsDataJson[0] === undefined
          ? 0
          : occupiedSeatsDataJson[0].occupiedSeats;
      setOccupancy(calculateOccupancy(numberOfSeats, occupiedSeats));
    }
    fetchData();
  }, [date, numberOfSeats]);

  useEffect(() => {
    setPrice(
      calculateTicketPrice(
        arrivalOffsetB,
        departureOffsetA,
        false,
        occupancy,
        "regular",
        false
      )
    );
  }, [occupancy]);

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
        <Col className='col-2' id='wifi'>
          <img alt='wifi' className='custom-icon' src='../images/wifi.svg' />
        </Col>
        {!!hasHandicapSeats && (
          <Col className='col-2' id='wheelchair'>
            <img
              alt='wheelchair'
              className='custom-icon'
              src='../images/wheelchair.svg'
            />
          </Col>
        )}
        {!!isPetsAllowed && (
          <Col className='col-2' id='dog'>
            <img alt='dog' className='custom-icon' src='../images/dog.svg' />
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
