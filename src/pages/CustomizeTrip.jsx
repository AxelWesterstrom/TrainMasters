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
    date: "2022-09-23",
    departure: 103,
    arrival: 97,
    journeyId: 8,
  };

  const [bookedSeats, setBookedSeats] = useState();
  const [routeAndTrainSet, setRouteAndTrainSet] = useState();
  const [trainSetAndCarriages, setTrainSetAndCarriages] = useState();

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `/api/bookingPartsWithDepartureAndArrivalStationInfo/?date=${train.date.slice(
          0,
          10
        )}&departureStationDeparture<=${
          train.departure
        }&arrivalStationArrival>=${train.arrival}&journeyId=${train.journeyId}`
      ).then((res) => {
        if (res.ok) {
          setBookedSeats(res.json());
        }
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`/api/routes/?id=${bookedSeats[0].routeId}`).then((res) => {
        if (res.ok) {
          setRouteAndTrainSet(res.json());
        }
      });
    };
    fetchData();
  }, []);

  // bookedSeats.map((x) => {
  //   console.log(x);
  // });

  //What if there is no booking?
  //Check the data if it's empty

  //Need trainsetId and carriageId in occupiedSeatIdWithDateAndJourneyId
  //Eventually also need carriagesAndSeats view

  const handleClick = () => {
    navigate("/valj-tag");
  };

  const goToNextPage = () => {
    navigate("/kassan");
  };

  const goToChooseSeats = () => {
    setShowModal(true);
  };

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
                  {train.depature} - {train.arrival}
                </p>
                <p className="custom-label">{train.date}</p>
                <p className="custom-label">{train.time}</p>
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
