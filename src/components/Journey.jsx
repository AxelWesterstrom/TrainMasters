import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import calculateTicketPrice from "../assets/helpers/calculateTicketPrice";
import calculateOccupancy from "../assets/helpers/calculateOccupancy";

function Journey(props) {
  let { date, journey, chosenJourney, setChosenJourney } = props;

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
  const [occupancy, setOccupancy] = useState(0);
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  const [petsAllowed, setPetsAllowed] = useState(0);
  const [isHandicapSeat, setIsHandicapSeat] = useState(0);
  const [firstClass, setFirstClass] = useState(0);
  const [availableIsHandicapSeat, setAvailableIsHandicapSeat] = useState(0);
  const [availablePetsAllowed, setAvailablePetsAllowed] = useState(0);
  const [availableFirstClass, setAvailableFirstClass] = useState(0);

  useEffect(() => {
    async function fetchData() {
      let fetchedData;
      try {
        fetchedData = await fetch(
          `/api/seatsInTrainSetWithSeatInfo?trainSetId=${trainSetId}`
        );
      } catch (e) {
        console.error("error ");
      }

      let data = await fetchedData.json();
      data = data[0];
      setNumberOfSeats(data.numberOfSeats);
      setFirstClass(+data.firstClass);

      let bistro = +data.hasBistro;
      setHasBistro(bistro === 0 || bistro === undefined ? false : true);
      setIsHandicapSeat(+data.hasHandicapSeats);
      setHasHandicapSeats(
        isHandicapSeat === 0 || isHandicapSeat === undefined ? false : true
      );
      setPetsAllowed(+data.petsAllowed);
      setIsPetsAllowed(
        petsAllowed === 0 || petsAllowed === undefined ? false : true
      );
    }
    fetchData();
  }, []);

  useEffect(() => {
    let occupiedSeats,
      occupiedIsHandicapSeats,
      occupiedPetsAllowed,
      occupiedFirstClass;
    async function fetchData() {
      let occupiedSeatsData;
      try {
        occupiedSeatsData = await fetch(
          `/api/occupiedSeatsWithDateAndJourneyAndTrainSet?date=${date}&journeyId=${journeyId}&trainSetId=${trainSetId}`
        );
      } catch (e) {
        console.error("error");
      }
      let occupiedSeatsDataJson = await occupiedSeatsData.json();
      if (!occupiedSeatsDataJson[0] || occupiedSeatsDataJson[0] === undefined) {
        occupiedSeats = 0;
        occupiedIsHandicapSeats = 0;
        occupiedPetsAllowed = 0;
        occupiedFirstClass = 0;
      } else {
        occupiedSeats = +occupiedSeatsDataJson[0].occupiedSeats;
        occupiedIsHandicapSeats =
          +occupiedSeatsDataJson[0].occupiedIsHandicapSeat;
        occupiedPetsAllowed = +occupiedSeatsDataJson[0].occupiedPetsAllowed;
        occupiedFirstClass = +occupiedSeatsDataJson[0].occupiedFirstClass;
      }

      setAvailableIsHandicapSeat(isHandicapSeat - occupiedIsHandicapSeats);
      setAvailablePetsAllowed(petsAllowed - occupiedPetsAllowed);
      setAvailableFirstClass(firstClass - occupiedFirstClass);
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

  function handleClickedJourney(journey) {
    setChosenJourney({ ...journey });
  }

  return (
    <Container
      className='journeyItem mb-3'
      onClick={() => {
        handleClickedJourney(journey);
      }}
    >
      <div className={!price || isNaN(price) ? "blurry" : ""}>
        <Row className='p-2'>
          <Col className='col-6'>
            <p className='custom-text'>
              {departureTimeA} - {arrivalTimeB}
            </p>
          </Col>
          <Col className='col-6 d-flex justify-content-end'>
            <p className='custom-text'>
              {!price || isNaN(price) || price == Infinity
                ? ""
                : "fr. " + price + " kr"}
            </p>
          </Col>
        </Row>
        <Row className='p-2'>
          <Col className='col-1' id='wifi'>
            <img alt='wifi' className='custom-icon' src='../images/wifi.svg' />
          </Col>
          {!!hasHandicapSeats ||
            (availableIsHandicapSeat > 0 && (
              <Col className='col-1' id='wheelchair'>
                <img
                  alt='wheelchair'
                  className='custom-icon'
                  src='../images/wheelchair.svg'
                />
              </Col>
            ))}
          {!!isPetsAllowed ||
            (availablePetsAllowed > 0 && (
              <Col className='col-1' id='dog'>
                <img
                  alt='dog'
                  className='custom-icon'
                  src='../images/dog.svg'
                />
              </Col>
            ))}
          {!!hasBistro && (
            <Col className='col-1' id='knifeAndFork'>
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
      </div>
    </Container>
  );
}
export default Journey;
