import ClassSelector from "../components/ClassSelector";
import Header from "../components/Header";
import styles from "../../public/css/customizeTrip.css";
import { useState, useEffect } from "react";
import { Container, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ChooseSeatsModal from "../components/ChooseSeatsModal";
import { useStates } from "../assets/helpers/states";
import CancelableSelector from "../components/CancelableSelector";

function CustomizeTrip() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [totalSeatsInTrain, setTotalSeatsInTrain] = useState([]);
  const [totalOccupiedSeats, setTotolOccupiedSeats] = useState([]);
  const [wheechairSeatsFullBooked, setWheelChairSeatsFullBooked] =
    useState(false);
  const [petsCarraigeFullBooked, setPetsCarriageFullBooked] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

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
    const fetchData = async () => {
      await fetch(
        `/api/occupiedSeatsWithDateAndJourneyAndTrainSet?date=${new Date(
          s.ticket.date
        ).toLocaleDateString("sv-SE")}&journeyId=${
          s.ticket.chosenJourney.journeyId
        }&trainSetId=${s.ticket.chosenJourney.trainSetId}`
      )
        .then((res) => res.json())
        .then((jsonData) => {
          if (jsonData[0] !== undefined) {
            setTotolOccupiedSeats(jsonData[0]);
          } else {
            setTotolOccupiedSeats(0);
          }
        });
    };
    fetchData();
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
      s.ticket.seat = [...selectedSeats];
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
    if (!s.ticket.seat || s.ticket.seat.length === 0) {
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
    s.ticket.seat = [];
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
            <Container className="train-info-container p-5">
              <Container className="m-3">
                <p className="custom-label">
                  {s.ticket.chosenJourney.stationNameA} -{" "}
                  {s.ticket.chosenJourney.stationNameB}
                </p>
                <p className="custom-label">
                  {new Date(s.ticket.date).toLocaleDateString()}
                </p>
                <p className="custom-label">
                  {s.ticket.chosenJourney.departureTimeA}
                </p>
                <Button className="custom-button" onClick={goToFormerPage}>
                  Ändra
                </Button>
              </Container>
            </Container>
          </Container>
          <ClassSelector
            totalOccupiedSeats={totalOccupiedSeats}
            totalSeatsInTrain={totalSeatsInTrain}
            setWheelChairSeatsFullBooked={setWheelChairSeatsFullBooked}
            setPetsCarriageFullBooked={setPetsCarriageFullBooked}
            setSeatsToBook={seatsToBook}
          />
          <CancelableSelector />
          <Container className="p-2">
            <Container className="seat-selector-container p-5">
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
      <Container className="d-flex justify-content-end info pb-5 mb-5">
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