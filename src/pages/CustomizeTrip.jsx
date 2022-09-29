import ClassSelector from "../components/ClassSelector";
import Header from "../components/Header";
import SeatsSelector from "../components/SeatsSelector";
import styles from "../../public/css/customizeTrip.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CarriageSelector from "../components/CarriageSelector";

function CustomizeTrip() {
  const navigate = useNavigate();
  // const { state } = useLocation();
  // const { train } = state;
  const [showModal, setShowModal] = useState(false);

  let train = {
    //This should be fetch from the former page - "valj-tag"
    arrivalOffsetA: null,

    arrivalOffsetB: 32,

    arrivalTimeA: null,

    arrivalTimeB: "12:32",

    departureOffsetA: 0,

    departureOffsetB: 34,

    departureTimeA: "12:00",

    departureTimeB: "12:34",

    journeyId: 15,

    justOnWeekdays: 0,

    platformA: 2,

    platformB: 3,

    routeId: 6,

    routeName: "Trelleborg - Helsingborg C",

    startTime: "12:00",

    stationIdA: 90,

    stationIdB: 96,

    stationNameA: "Trelleborg",

    stationNameB: "Malmö C",

    trainSetId: 3,
  };

  let date = "2022-09-26";
  let departure = "Trelleborg";
  let arrival = "Malmö C";

  const [bookedSeats, setBookedSeats] = useState([]);
  const [trainSetAndCarriages, setTrainSetAndCarriages] = useState();

  useEffect(() => {
    const fetchBookdSeats = async () => {
      await fetch(
        `/api/bookingPartsWithDepartureAndArrivalStationInfo/?date=${date.slice(
          0,
          10
        )}&departureStationDeparture<=${departure}&arrivalStationArrival>=${arrival}&journeyId=${
          train.journeyId
        }`
      )
        .then((res) => res.json())
        .then((jsonData) => setBookedSeats(jsonData));
    };

    fetchBookdSeats();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`/api/carriagesWithSeats/?trainsetId=${train.trainSetId}}`)
        .then((res) => res.json())
        .then((jsonData) => setTrainSetAndCarriages(jsonData));
    };
    fetchData();
  }, [bookedSeats]);

  const handleClick = () => {
    navigate("/valj-tag");
  };

  const goToNextPage = () => {
    navigate("/kassan");
  };

  const goToChooseSeats = () => {
    setShowModal(true);
  };
  console.log(trainSetAndCarriages);

  return (
    <>
      <Header />
      <div className="body">
        <div onClick={handleClick}>
          <img
            src="../images/arrow-left.svg"
            className="mt-2 ms-3 back-button"
          />
        </div>
        <Container>
          <Container className="p-2">
            <Container className="train-info-container p-5">
              <Container className="m-3">
                <p className="custom-label">
                  {train.stationNameA} - {train.stationNameB}
                </p>
                <p className="custom-label">{date}</p>
                <p className="custom-label">{train.departureTimeA}</p>
                <Button className="custom-button" onClick={handleClick}>
                  Ändra
                </Button>
              </Container>
            </Container>
          </Container>
          <ClassSelector />
          <Container className="p-2">
            <Container className="seat-selector-container p-5">
              <p className="custom-label m-4" onClick={goToChooseSeats}>
                <img src="../images/plus-icon.svg" className="custom-icon" />
                Välj plats
              </p>
            </Container>
          </Container>
        </Container>
        <CarriageSelector showModal={showModal} setShowModal={setShowModal} />

        <Container className="d-flex justify-content-end  info">
          <Button className="custom-button mt-3 mb-5" onClick={goToNextPage}>
            Fortsätt
          </Button>
        </Container>
      </div>
    </>
  );
}

export default CustomizeTrip;
