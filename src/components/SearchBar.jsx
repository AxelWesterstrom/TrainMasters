import { Row, Col, Button, Form, Container, Modal } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AutoSuggest from "./AutoSuggest";

function SearchBar({ stations }) {
  const [departure, setDepature] = useState("");
  const [arrival, setArrival] = useState("");
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const goToNextPage = () => {
    if (departure.length !== 0 && arrival.length !== 0) {
      navigate("/valj-resa", { state: { departure, arrival } });
    } else {
      setShow(true);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-5 pt-5">
        <Container className="p-1 m-1">
          <Form className="customContainer" onSubmit={handleSubmit}>
            <Row className="row-centered">
              <Col className="col-lg-6 col-12">
                <Form.Group className="mb-3" controlId="departureStation">
                  <Form.Label className="customInputLabel">Från</Form.Label>
                  <AutoSuggest stations={stations} setUserInput={setDepature} />
                </Form.Group>
              </Col>
              <Col className="col-lg-6 col-12">
                <Form.Group className="mb-3" controlId="destinationStation">
                  <Form.Label className="customInputLabel">Till</Form.Label>
                  <AutoSuggest stations={stations} setUserInput={setArrival} />
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-end">
              <Button className="customButton" onClick={goToNextPage}>
                Sök
              </Button>
            </div>
          </Form>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>

            <Modal.Body>
              <p>Fyll i destination och avreseort!</p>
            </Modal.Body>

            <Modal.Footer>
              <Button className="customButton" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    </>
  );
}

export default SearchBar;
