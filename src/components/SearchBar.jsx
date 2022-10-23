import { Button, Form, Container, Modal } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AutoSuggest from "./AutoSuggest.jsx";
import { useStates } from "../assets/helpers/states";

function SearchBar({ stations }) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  let s = useStates("booking");

  const goToNextPage = () => {
    let noDirectTrain = s.autoSuggestStations.some(
      (x) => x === s.ticket.arrival
    );
    if (
      s.ticket.departure.length !== 0 &&
      s.ticket.arrival.length !== 0 &&
      noDirectTrain
    ) {
      navigate("/valj-resa");
    } else if (
      !noDirectTrain &&
      s.ticket.arrival.length !== 0 &&
      s.ticket.departure.length !== 0
    ) {
      setErrorMessage(
        "Tyvärr! Vi har inget direkt tåg till " + s.ticket.arrival + "!"
      );
      setShow(true);
    } else if (
      s.ticket.departure.length === 0 ||
      s.ticket.arrival.length === 0
    ) {
      setErrorMessage("Fyll i destination och avreseort!");
      setShow(true);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-5 pt-5">
        <Container className="p-1 m-1">
          <Form className="customContainer">
            <AutoSuggest stations={stations} />
            <div className="d-flex justify-content-end">
              <Button className="custom-button" onClick={goToNextPage}>
                Sök
              </Button>
            </div>
          </Form>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <p className="custom-label">{errorMessage}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button className="custom-button" onClick={handleClose}>
                Stäng
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    </>
  );
}

export default SearchBar;
