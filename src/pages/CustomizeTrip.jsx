import ClassSelector from "../components/ClassSelector";
import Header from "../components/Header";
import styles from "../../public/css/customizeTrip.css";
import { useState, useEffect } from "react";
import { Container, Button, Modal, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ChooseSeatsModal from "../components/ChooseSeatsModal";
import { useStates } from "../assets/helpers/states";
import CancelableSelector from "../components/CancelableSelector";

function CustomizeTrip() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [totalSeatsInTrain, setTotalSeatsInTrain] = useState([]);
  const [wheechairSeatsFullBooked, setWheelChairSeatsFullBooked] =
    useState(false);
  const [petsCarraigeFullBooked, setPetsCarriageFullBooked] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [bookedSeats, setBookedSeats] = useState([]);

  let s = useStates("booking");
  let count = 0;
  s.ticket.passengers.map((x) => {
    count += x.count;
  });
  const [seatsToBook, setSeatsToBook] = useState(count);

  useEffect(() => {
    if (!s.ticket.departure || !s.ticket.arrival) {
      navigate("/");
    }
    if (!s.ticket.chosenJourney) {
      navigate("/valj-tag");
    }
    if (!s.ticket.date || !s.ticket.passengers) {
      navigate("/valj-resa");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `/api/seatsInTrainSetWithSeatInfo?trainSetId=${s.ticket.chosenJourney.trainSetId}`
      )
        .then((res) => res.json())
        .then((jsonData) => setTotalSeatsInTrain(jsonData[0]));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchBookdSeats = async () => {
      await fetch(
        `/api/occupiedSeatIdWithDateAndJourneyId?date=${new Date(
          s.ticket.date
        ).toLocaleDateString("sv-SE")}&departureStationDeparture<=${s.ticket.chosenJourney.arrivalOffsetB
        }&arrivalStationArrival>=${s.ticket.chosenJourney.departureOffsetA
        }&journeyId=${s.ticket.chosenJourney.journeyId}`
      )
        .then((res) => res.json())
        .then((jsonData) => {
          setBookedSeats(jsonData);
        });
    };
    fetchBookdSeats();
  }, [totalSeatsInTrain]);

  const handleModalClose = () => {
    if (selectedSeats.length !== seatsToBook) {
      setShowErrorModal(true);
      setErrorMessage(
        "Antal sittplats att välja är " +
        seatsToBook +
        ", välj " +
        (seatsToBook - selectedSeats.length) +
        " till!"
      );
    } else {
      setShowModal(false);
      s.ticket.seats = [...selectedSeats];
    }
  };

  const goToFormerPage = () => {
    navigate("/valj-tag");
    s.ticket.carriageClass = 0;
    s.ticket.type = "";
  };

  const goToNextPage = () => {
    if (s.ticket.carriageClass === 0 || s.ticket.type === "") {
      setShowErrorModal(true);
      setErrorMessage(
        "Välj klass, biljett-flexibilitet och sittplats för att fortsätta!"
      );
    }
    if (!s.ticket.seats || s.ticket.seats.length === 0) {
      setShowErrorModal(true);
      setErrorMessage(
        "Välj klass, biljett-flexibilitet och sittplats för att fortsätta!"
      );
    } else {
      navigate("/kassan");
    }
  };

  const showSeatsSelectorModal = () => {
    setShowModal(true);
  };

  const deleteSelectedSeats = () => {
    s.ticket.seats = [];
    setSelectedSeats([]);
  };

  const handleErrorModalClose = () => {
    setShowErrorModal(false);
  };

  return (
    <>
      <Header />
      <div className="body pb-5">
        <div onClick={goToFormerPage}>
          <img
            src="../images/arrow-left.svg"
            className="mt-2 ms-3 back-button"
          />
        </div>
        <Container>
          <Container className="p-2">
            <Container className="train-info-container p-4">
              <Container className="m-3">
                <p className="custom-label">
                  {s.ticket.chosenJourney.stationNameA} -{" "}
                  {s.ticket.chosenJourney.stationNameB}
                </p>
                <p className="custom-label">
                  {new Date(s.ticket.date).toLocaleDateString("sv-SE")}
                </p>
                <p className="custom-label">
                  {s.ticket.chosenJourney.departureTimeA} -{" "}
                  {s.ticket.chosenJourney.arrivalTimeB}
                </p>
                <Button className="custom-button" onClick={goToFormerPage}>
                  Ändra
                </Button>
              </Container>
            </Container>
          </Container>
          <ClassSelector
            totalSeatsInTrain={totalSeatsInTrain}
            setWheelChairSeatsFullBooked={setWheelChairSeatsFullBooked}
            setPetsCarriageFullBooked={setPetsCarriageFullBooked}
            setSeatsToBook={seatsToBook}
            bookedSeats={bookedSeats}
          />

          <CancelableSelector />
          <Container className="p-2">
            <Container className="seat-selector-container p-4">
              {selectedSeats.length === 0 && (
                <p
                  className="custom-label m-4"
                  onClick={showSeatsSelectorModal}
                  style={
                    s.ticket.type !== ""
                      ? {}
                      : { opacity: "0.68", pointerEvents: "none" }
                  }
                >
                  Välj plats
                </p>
              )}

              {selectedSeats.length !== 0 &&
                selectedSeats.map((seat, index) => {
                  return (
                    <div key={"seat" + index}>
                      <div className="d-flex">
                        <p className="custom-text me-4">
                          Plats: {seat.seatNumber}
                        </p>
                        <p className="custom-text">Vagn: {seat.carriage}</p>
                      </div>
                      {index === selectedSeats.length - 1 && (
                        <div className="d-flex justify-content-end">
                          <img
                            src="../images/delete.svg"
                            style={{
                              width: "30px",
                              height: "30px",
                              cursor: "pointer",
                            }}
                            onClick={deleteSelectedSeats}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
            </Container>
          </Container>
          <Container className="p-2">
            <Container className="train-info-container p-4">
              <Container className="m-1">
                <Row className="d-flex">
                  <Col className="col justify-content-center">
                    <p className="custom-text">
                      Vi erbjuder alltid Löfbergs Lila kaffe
                    </p>
                  </Col>

                  <Col className="col d-flex justify-content-center">
                    <img
                      src="../public/images/lofbergs.png"
                      style={{ width: "180px", height: "80px" }}
                    />
                  </Col>
                </Row>
              </Container>
            </Container>
          </Container>
        </Container>

        <Modal
          show={showModal}
          onHide={handleModalClose}
          className="seat-picker-modal modal-xl sm-modal-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title>Välj plats</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ChooseSeatsModal
              seatsToBook={seatsToBook}
              petsCarraigeFullBooked={petsCarraigeFullBooked}
              wheechairSeatsFullBooked={wheechairSeatsFullBooked}
              setWheelChairSeatsFullBooked={setWheelChairSeatsFullBooked}
              setPetsCarriageFullBooked={setPetsCarriageFullBooked}
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              bookedSeats={bookedSeats}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              className="custom-button"
              onClick={handleModalClose}
            >
              Fortsätt
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Container className="d-flex justify-content-end info mb-5">
        <Button className="custom-button mt-1 mb-5 me-2" onClick={goToNextPage}>
          Fortsätt
        </Button>
      </Container>
      <Modal
        show={showErrorModal}
        onHide={handleErrorModalClose}
        className="seat-picker-modal"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="custom-button"
            onClick={handleErrorModalClose}
          >
            Stäng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomizeTrip;