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
    journeyId,
    trainNumber
  } = journey;

  const [price, setPrice] = useState();
  const [hasBistro, setHasBistro] = useState(false);
  const [hasHandicapSeats, setHasHandicapSeats] = useState(true);
  const [isPetsAllowed, setIsPetsAllowed] = useState(true);
  const [occupancy, setOccupancy] = useState(0);
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  const [occupiedSeats, setOccupiedSeats] = useState(0);
  const [petsAllowed, setPetsAllowed] = useState(0);
  const [isHandicapSeat, setIsHandicapSeat] = useState(0);
  const [firstClass, setFirstClass] = useState(0);
  const [secondClass, setSecondClass] = useState(0);
  const [availableIsHandicapSeat, setAvailableIsHandicapSeat] = useState(0);
  const [availablePetsAllowed, setAvailablePetsAllowed] = useState(0);
  const [availableFirstClass, setAvailableFirstClass] = useState(0);
  const [availableSecondClass, setAvailableSecondClass] = useState(0);

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
      setSecondClass(+data.secondClass);

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
    let occupiedIsHandicapSeats, occupiedPetsAllowed, occupiedFirstClass;
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
        setOccupiedSeats(0);
        occupiedIsHandicapSeats = 0;
        occupiedPetsAllowed = 0;
        occupiedFirstClass = 0;
      } else {
        setOccupiedSeats(+occupiedSeatsDataJson[0].occupiedSeats);
        occupiedIsHandicapSeats =
          +occupiedSeatsDataJson[0].occupiedIsHandicapSeat;
        occupiedPetsAllowed = +occupiedSeatsDataJson[0].occupiedPetsAllowed;
        occupiedFirstClass = +occupiedSeatsDataJson[0].occupiedFirstClass;
      }

      setAvailableIsHandicapSeat(isHandicapSeat - occupiedIsHandicapSeats);
      setAvailablePetsAllowed(petsAllowed - occupiedPetsAllowed);
      setAvailableFirstClass(firstClass - occupiedFirstClass);
      setAvailableSecondClass(
        secondClass - (occupiedSeats - occupiedFirstClass)
      );
      setOccupancy(calculateOccupancy(numberOfSeats, occupiedSeats));
    }
    fetchData();
    console.log(journey.journeyId);
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

  useEffect(() => {
    setChosenJourney({});
  }, [date]);

  function handleClickedJourney(journey) {
    setChosenJourney({ ...journey });
  }

  return (
    <Container
      className={`mb-3  ${
        !chosenJourney || journeyId !== chosenJourney.journeyId
          ? "journeyItem"
          : "activeJourney"
      }`}
      onClick={() => {
        handleClickedJourney(journey);
      }}
    >
      <div
        className={
          !price || isNaN(price) || !(numberOfSeats - occupiedSeats)
            ? "blurry"
            : ""
        }
      >
        <Row className='pt-2'>
          <Col className='col-6'>
            <p className='custom-text'>
              {departureTimeA} - {arrivalTimeB}
            </p>
          </Col>
          <Col className='col-6 d-flex justify-content-end'>
            <p className='custom-text'>
              {!price || isNaN(price) || price == Infinity
                ? ""
                : numberOfSeats - occupiedSeats > 0
                ? "fr. " + price + " kr"
                : "Slutsåld"}
            </p>
          </Col>
        </Row>
        <Row className='pt-2'>
          <Col className='col-6'>
            <p className='custom-text'>
              Restid {Math.floor((arrivalOffsetB - departureOffsetA) / 60)}:
              {(arrivalOffsetB - departureOffsetA) % 60} timmar
            </p>
          </Col>
          <Col className='pt-2 col-6 d-flex justify-content-end'>
            <p className={availableSecondClass > 0 ? "" : "lineThrough"}>
              2 klass,
            </p>
            <p className={availableFirstClass > 0 ? "" : "lineThrough"}>
              1 klass
            </p>
          </Col>
        </Row>
        <Row className='pt-2'>
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
        <Row className='pt-2 mt-1'>
          <Col className='content-justify-start'>
            <p className='custom-text'>Tågmästarna Tåg {trainNumber}</p>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
export default Journey;
