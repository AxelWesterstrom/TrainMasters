import { useEffect } from "react";
import { useState } from "react";
import { Container, Form, Modal, Button } from "react-bootstrap";

function ClassSelector({
  totalOccupiedSeats,
  totalSeatsInTrain,
  firstClass,
  setFirstClass,
  secondClass,
  setSecondClass,
  setWheelChairSeatsFullBooked,
  setPetsCarriageFullBooked,
}) {
  const [firstClassFullBooked, setFirstClassFullBooked] = useState(false);
  const [secondClassFullBooked, setSecondClassFullBooked] = useState(false);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (
      +totalOccupiedSeats["occupiedFirstClass"] ===
      +totalSeatsInTrain["firstClass"]
    ) {
      setFirstClassFullBooked(true);
      setSecondClass(true);
    }
    if (
      +totalOccupiedSeats["occupiedSeats"] -
        +totalOccupiedSeats["occupiedFirstClass"] ===
      +totalSeatsInTrain["secondClass"]
    ) {
      setSecondClassFullBooked(true);
      setFirstClass(true);
    }
    if (
      +totalOccupiedSeats["occupiedPetsAllowed"] ===
      +totalSeatsInTrain["petsAllowed"]
    ) {
      setPetsCarriageFullBooked(true);
    }
    if (
      +totalOccupiedSeats["occupiedIsHandicapSeat"] ===
      +totalSeatsInTrain["hasHandicapSeats"]
    ) {
      setWheelChairSeatsFullBooked(true);
    }
  }, [totalOccupiedSeats]);

  // const handleSelectClass = (e) => {
  //   let className = e.target.id;
  //   if (firstClassFullBooked && className === "firstClass") {
  //     setErrorMessage("Tyvärr! 1 Klassen är fullbokad!");
  //     setShow(true);
  //   }
  //   if (secondClassFullBooked && className === "secondClass") {
  //     setErrorMessage("Tyvärr! 2 Klassen är fullbokad!");
  //     setShow(true);
  //   }
  // };

  const handleClose = () => setShow(false);

  return (
    <>
      <div>
        <Container className="p-2">
          <Container className="class-selector-container p-5">
            <Container className="m-3">
              <Form>
                {["radio"].map((type) => (
                  <div key={`${type}`} className="mb-3 custom-label">
                    {!firstClassFullBooked && (
                      <Form.Check
                        label="1 Klass"
                        name="group1"
                        type={type}
                        value={firstClass}
                        checked={
                          firstClass === true ||
                          (firstClass === false && secondClass === false)
                        }
                        id="firstClass"
                      />
                    )}
                    {!secondClassFullBooked && (
                      <Form.Check
                        label="2 Klass"
                        name="group1"
                        type={type}
                        value={secondClass}
                        checked={
                          secondClass === true ||
                          (firstClass === false && secondClass === false)
                        }
                        id="secondClass"
                      />
                    )}
                  </div>
                ))}
              </Form>
            </Container>
          </Container>
        </Container>
      </div>
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
    </>
  );
}

export default ClassSelector;
