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
  // const { state } = useLocation();
  // const { train } = state;
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

  let train = {
    //This should be fetch from the former page - "valj-tag"
    stationNameA: "Ängelholm",

    stationNameB: "Halmstad C",

    trainSetId: 2,

    journeyId: 8,

    departureStationDeparture: 85,

    arrivalStationArrival: 115,
  };

  let date = "2022-09-23";
  const [trainSetAndCarriages, setTrainSetAndCarriages] = useState();

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`/api/carriagesWithSeats/?trainsetId=${train.trainSetId}}`)
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

        <Modal show={showModal} onHide={handleClose} className="modal-xl">
          <Modal.Header closeButton>
            <Modal.Title>Välj plats</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CarriageSelector
              trainSetAndCarriages={trainSetAndCarriages}
              train={train}
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
