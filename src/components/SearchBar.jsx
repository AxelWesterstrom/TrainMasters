import { Row, Col, Button, Form, Container, Modal } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AutoSuggest from "./AutoSuggest";

function SearchBar({ stations }) {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [foundTrain, setFoundTrain] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  //should check if departure and arrival is in same route, should fetch routesWithStations view
  const goToNextPage = () => {
    if (departure.length !== 0 && arrival.length !== 0 && foundTrain) {
      navigate("/valj-resa", { state: { departure, arrival } });
    } else if (!foundTrain && arrival.length !== 0) {
      setErrorMessage("Tyvärr! Vi har inget direkt tåg till " + arrival + "!");
      setShow(true);
    } else if (departure.length === 0 || arrival.length === 0) {
      setErrorMessage("Fyll i destination och avreseort!");
      setShow(true);
    }
  };

  return (
    <>
      <div className='d-flex justify-content-center mt-5 pt-5'>
        <Container className='p-1 m-1'>
          <Form className='customContainer'>
            <AutoSuggest
              stations={stations}
              departure={departure}
              arrival={arrival}
              setDeparture={setDeparture}
              setArrival={setArrival}
              setFoundTrain={setFoundTrain}
            />
            <div className='d-flex justify-content-end'>
              <Button className='custom-button' onClick={goToNextPage}>
                Sök
              </Button>
            </div>
          </Form>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <p className='custom-label'>{errorMessage}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button className='custom-button' onClick={handleClose}>
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
