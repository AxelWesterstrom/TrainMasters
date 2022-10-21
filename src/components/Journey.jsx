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

  const [occupiedSeatsData, setOccupiedSeatsData] = useState([]);
  const [hasBistro, setHasBistro] = useState(false);
  const [bistro, setBistro] = useState(0);
  const [hasHandicapSeats, setHasHandicapSeats] = useState(true);
  const [isPetsAllowed, setIsPetsAllowed] = useState(true);
  const [occupancy, setOccupancy] = useState(0);
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  const [firstClassSeats, setFirstClassSeats] = useState(0);
  const [secondClassSeats, setSecondClassSeats] = useState(0);
  const [occupiedSeats, setOccupiedSeats] = useState(0);
  const [bookedPetsSeats, setBookedPetsSeats] = useState(0);
  const [isHandicapSeat, setIsHandicapSeat] = useState(0);
  const [bookedFirstClass, setBookedFirstClass] = useState(0);
  const [bookedSecondClass, setBookedSecondClass] = useState(0);
  const [bookedWheelchair, setBookedWheelchair] = useState(0);
  const [petsAllowed, setPetsAllowed] = useState(0);
  const [firstClassFullBooked, setFirstClassFullBooked] = useState(false);
  const [secondClassFullBooked, setSecondClassFullBooked] = useState(false);
  const [petsCarriageFullBooked, setPetsCarriageFullBooked] = useState(false);
  const [wheelChairSeatsFullBooked, setWheelChairSeatsFullBooked] =
    useState(false);
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
      setBistro(+data.hasBistro);
      setIsHandicapSeat(+data.hasHandicapSeats);
      setPetsAllowed(+data.petsAllowed);
    })();
  }, []);

  useEffect(() => {
    setHasBistro(bistro === 0 || bistro === undefined ? false : true);
    setHasHandicapSeats(
      isHandicapSeat === 0 || isHandicapSeat === undefined ? false : true
    );
    setIsPetsAllowed(
      petsAllowed === 0 || petsAllowed === undefined ? false : true
    );
  }, [
    numberOfSeats,
    firstClassSeats,
    secondClassSeats,
    bistro,
    isHandicapSeat,
    petsAllowed
  ]);

  useEffect(() => {
    (async () => {
      setOccupiedSeatsData(
        await (
          await fetch(
            `/api/occupiedSeatIdWithDateAndJourneyId?date=${new Date(
              s.ticket.date
            ).toLocaleDateString(
              "sv-SE"
            )}&journeyId=${journeyId}&trainSetId=${trainSetId}&arrivalStationArrival>${departureOffsetA}&departureStationDeparture<${arrivalOffsetB}`
          )
        ).json()
      );
    })();
  }, [s.ticket.date, numberOfSeats]);

  useEffect(() => {
    let countF = 0;
    let countP = 0;
    let countS = 0;
    let countW = 0;
    let countTot = 0;

    occupiedSeatsData.map(seat => {
      if (seat.firstClass === 1) {
        countF += 1;
        countTot += 1;
      }
      if (seat.firstClass === 0) {
        countS += 1;
        countTot += 1;
      }
      if (seat.petsAllowed === 1) {
        countP += 1;
      }
      if (seat.isHandicapSeat === 1) {
        countW += 1;
      }
    });
    setBookedFirstClass(countF);
    setBookedSecondClass(countS);
    setBookedPetsSeats(countP);
    setBookedWheelchair(countW);
    setOccupiedSeats(countTot);
  }, [occupiedSeatsData]);

  useEffect(() => {
    setOccupancy(calculateOccupancy(numberOfSeats, occupiedSeats));
  }, [numberOfSeats, occupiedSeats]);

  useEffect(() => {
    if (bookedFirstClass === firstClassSeats) {
      setFirstClassFullBooked(true);
    } else {
      setFirstClassFullBooked(false);
    }
    if (bookedSecondClass === secondClassSeats) {
      setSecondClassFullBooked(true);
    } else {
      setSecondClassFullBooked(false);
    }
    if (bookedPetsSeats === petsAllowed) {
      setPetsCarriageFullBooked(true);
    } else {
      setPetsCarriageFullBooked(false);
    }
    if (bookedWheelchair === isHandicapSeat) {
      setWheelChairSeatsFullBooked(true);
    } else {
      setWheelChairSeatsFullBooked(false);
    }
  }, [
    bookedFirstClass,
    bookedSecondClass,
    bookedPetsSeats,
    bookedWheelchair,
    s.ticket.date,
    secondClassSeats,
    firstClassSeats,
    petsAllowed,
    isHandicapSeat
  ]);

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

  function calcTravelTime() {
    let hours = Math.floor((arrivalOffsetB - departureOffsetA) / 60);
    let minutes = (arrivalOffsetB - departureOffsetA) % 60;
    let timeValue = "";
    if (hours < 1) {
      timeValue = "minuter";
      return `${minutes} ${timeValue}`;
    } else {
      minutes = minutes < 10 ? "0" + minutes : minutes;
      timeValue = "timmar";
      return `${hours}:${minutes} ${timeValue}`;
    }
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
              {departureTimeA} - {arrivalTimeB}
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
            <p className={!secondClassFullBooked ? "" : "lineThrough"}>
              2 klass,
            </p>
            <p className={!firstClassFullBooked ? "" : "lineThrough"}>
              1 klass
            </p>
          </Col>
        </Row>
        <Row className='pt-2'>
          <Col className='col-1' id='wifi'>
            <img alt='wifi' className='custom-icon' src='../images/wifi.svg' />
          </Col>
          {hasHandicapSeats && !wheelChairSeatsFullBooked && (
            <Col className='col-1' id='wheelchair'>
              <img
                alt='wheelchair'
                className='custom-icon'
                src='../images/wheelchair.svg'
              />
            </Col>
          )}
          {isPetsAllowed && !petsCarriageFullBooked && (
            <Col className='col-1' id='dog'>
              <img alt='dog' className='custom-icon' src='../images/dog.svg' />
            </Col>
          )}
          {hasBistro && (
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
