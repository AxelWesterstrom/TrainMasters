import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import calculateTicketPrice from "../assets/helpers/calculateTicketPrice";
import calculateOccupancy from "../assets/helpers/calculateOccupancy";
import { useStates } from "../assets/helpers/states";

function Journey(props) {
  let s = useStates("booking");

  let { journey } = props;
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

  const [hasBistro, setHasBistro] = useState(false);
  const [hasHandicapSeats, setHasHandicapSeats] = useState(true);
  const [isPetsAllowed, setIsPetsAllowed] = useState(true);
  const [occupancy, setOccupancy] = useState(0);
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  const [occupiedSeats, setOccupiedSeats] = useState(0);
  const [petsAllowed, setPetsAllowed] = useState(0);
  const [isHandicapSeat, setIsHandicapSeat] = useState(0);
  const [firstClassSeats, setFirstClassSeats] = useState(0);
  const [secondClassSeats, setSecondClassSeats] = useState(0);
  const [availableIsHandicapSeat, setAvailableIsHandicapSeat] = useState(0);
  const [availablePetsAllowed, setAvailablePetsAllowed] = useState(0);
  const [availableFirstClass, setAvailableFirstClass] = useState(0);
  const [availableSecondClass, setAvailableSecondClass] = useState(0);
  const [secondClassPrice, setSecondClassPrice] = useState(0);
  const [firstClassPrice, setFirstClassPrice] = useState(0);

  useEffect(() => {
    (async () => {
      let data = await (
        await fetch(`/api/seatsInTrainSetWithSeatInfo?trainSetId=${trainSetId}`)
      ).json();
      data = data[0];
      setNumberOfSeats(data.numberOfSeats);
      setFirstClassSeats(+data.firstClass);
      setSecondClassSeats(+data.secondClass);

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
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let occupiedIsHandicapSeats, occupiedPetsAllowed, occupiedFirstClass;
      let occupiedSeatsData = await (
        await fetch(
          `/api/occupiedSeatsWithDateAndJourneyAndTrainSet?date=${new Date(
            s.ticket.date
          ).toLocaleDateString(
            "sv-SE"
          )}&journeyId=${journeyId}&trainSetId=${trainSetId}`
        )
      ).json();
      if (!occupiedSeatsData[0] || occupiedSeatsData[0] === undefined) {
        occupiedIsHandicapSeats = 0;
        occupiedPetsAllowed = 0;
        occupiedFirstClass = 0;
      } else {
        setOccupiedSeats(+occupiedSeatsData[0].occupiedSeats);
        occupiedIsHandicapSeats = +occupiedSeatsData[0].occupiedIsHandicapSeat;
        occupiedPetsAllowed = +occupiedSeatsData[0].occupiedPetsAllowed;
        occupiedFirstClass = +occupiedSeatsData[0].occupiedFirstClass;
      }

      setAvailableIsHandicapSeat(isHandicapSeat - occupiedIsHandicapSeats);
      setAvailablePetsAllowed(petsAllowed - occupiedPetsAllowed);
      setAvailableFirstClass(firstClassSeats - occupiedFirstClass);
      setAvailableSecondClass(
        secondClassSeats - (occupiedSeats - occupiedFirstClass)
      );
      setOccupancy(calculateOccupancy(numberOfSeats, occupiedSeats));
    })();
  }, [s.ticket.date, numberOfSeats]);

  useEffect(() => {
    let totPriceFirstClass = 0;
    let totPriceSecondClass = 0;

    s.ticket.passengers.map(type => {
      if (type.count !== 0) {
        totPriceSecondClass +=
          type.count *
          calculateTicketPrice(
            arrivalOffsetB,
            departureOffsetA,
            false,
            occupancy,
            type.travelerType
          );
      }
    });
    setSecondClassPrice(totPriceSecondClass);

    s.ticket.passengers.map(type => {
      if (type.count !== 0) {
        totPriceFirstClass +=
          type.count *
          calculateTicketPrice(
            arrivalOffsetB,
            departureOffsetA,
            true,
            occupancy,
            type.travelerType
          );
      }
    });
    setFirstClassPrice(totPriceFirstClass);
  }, [occupancy]);

  useEffect(() => {
    s.ticket.chosenJourney = {};
  }, [s.ticket.date]);

  function handleClickedJourney(journey) {
    s.ticket.chosenJourney = { ...journey };
    s.ticket.secondClassPrice = secondClassPrice;
    s.ticket.firstClassPrice = firstClassPrice;
  }

  /* function checkTime(time) {
    let hours = time.substring(0, time.indexOf(":"));
    let minutes = time.substring(time.indexOf(":") + 1);
    if (hours > 23) {
      hours = hours - 24;
      if (hours < 10) {
        hours = "0" + hours;
      }
      time = hours + ":" + minutes;
    }
    return time;
  }
 */
  function calcTravelTime() {
    let hours = Math.floor((arrivalOffsetB - departureOffsetA) / 60);
    let minutes =
      (arrivalOffsetB - departureOffsetA) % 60 < 10
        ? "0" + ((arrivalOffsetB - departureOffsetA) % 60)
        : (arrivalOffsetB - departureOffsetA) % 60;
    let timeValue = "";
    if (hours < 1) {
      timeValue = "minuter";
    } else {
      timeValue = "timmar";
    }
    return `${hours}:${minutes} ${timeValue}`;
  }

  return (
    <Container
      className={`mb-3  ${
        !s.ticket.chosenJourney ||
        journeyId !== s.ticket.chosenJourney.journeyId
          ? "journeyItem"
          : "activeJourney"
      }`}
      style={
        !secondClassPrice
          ? { pointerEvents: "none" }
          : isNaN(secondClassPrice)
          ? { pointerEvents: "none" }
          : !(numberOfSeats - occupiedSeats)
          ? { pointerEvents: "none" }
          : {}
      }
      onClick={() => {
        handleClickedJourney(journey);
      }}
    >
      <div
        className={
          !secondClassPrice ||
          isNaN(secondClassPrice) ||
          !(numberOfSeats - occupiedSeats)
            ? "blurry"
            : ""
        }
      >
        <Row className='pt-2'>
          <Col className='col-6'>
            <p className='custom-text'>
              {/*checkTime*/ departureTimeA} - {/*checkTime(*/ arrivalTimeB}
            </p>
          </Col>
          <Col className='col-6 d-flex justify-content-end'>
            <p className='custom-text'>
              {!secondClassPrice ||
              isNaN(secondClassPrice) ||
              secondClassPrice == Infinity
                ? ""
                : numberOfSeats - occupiedSeats > 0
                ? "fr. " + secondClassPrice + " kr"
                : "Slutsåld"}
            </p>
          </Col>
        </Row>
        <Row className='pt-2'>
          <Col className='col-6'>
            <p className='custom-text'> Restid {calcTravelTime()}</p>
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
