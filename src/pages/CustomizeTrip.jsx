import ClassSelector from "../components/ClassSelector";
import Header from "../components/Header";
import styles from "../../public/css/customizeTrip.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CarriageSelector from "../components/CarriageSelector";

function CustomizeTrip() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { chosenJourney, date } = state;
  const {
    journeyId,
    trainSetId,
    stationNameA,
    stationNameB,
    departureTimeA,
    departureOffsetA,
    arrivalOffsetB
  } = chosenJourney;
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const [trainSetAndCarriages, setTrainSetAndCarriages] = useState();

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`/api/carriagesWithSeats/?trainsetId=${trainSetId}}`)
        .then((res) => res.json())
        .then((jsonData) => setTrainSetAndCarriages(jsonData));
    };
    fetchData();
  }, []);

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
      <div className="body pb-5">
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
                  {stationNameA} - {stationNameB}
                </p>
                <p className="custom-label">{date}</p>
                <p className="custom-label">{departureTimeA}</p>
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

        <Modal
          show={showModal}
          onHide={handleClose}
          className="seat-picker-modal modal-xl sm-modal-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title>Välj plats</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CarriageSelector
              trainSetAndCarriages={trainSetAndCarriages}
              train={chosenJourney}
              date={date}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              className="custom-button"
              onClick={handleClose}
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
    </>
  );
}

export default CustomizeTrip;
