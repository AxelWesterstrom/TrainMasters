import { useEffect } from "react";
import { useState } from "react";
import { Container, Form } from "react-bootstrap";

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

  useEffect(() => {
    if (totalOccupiedSeats !== 0) {
      if (
        +totalOccupiedSeats["occupiedFirstClass"] ===
        +totalSeatsInTrain["firstClass"]
      ) {
        setFirstClassFullBooked(true);
      }
      if (
        +totalOccupiedSeats["occupiedSeats"] -
          +totalOccupiedSeats["occupiedFirstClass"] ===
        +totalSeatsInTrain["secondClass"]
      ) {
        setSecondClassFullBooked(true);
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
    } else {
      setFirstClassFullBooked(false);
      setSecondClassFullBooked(false);
      setPetsCarriageFullBooked(false);
      setWheelChairSeatsFullBooked(false);
    }
  }, []);

  const handleSelectClass = (e) => {
    let className = e.target.id;
    if (className === "firstClass") {
      setFirstClass(true);
      setSecondClass(false);
    }
    if (className === "secondClass") {
      setSecondClass(true);
      setFirstClass(false);
    }
  };

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
                        onChange={(e) => handleSelectClass(e)}
                        id="firstClass"
                      />
                    )}
                    {!secondClassFullBooked && (
                      <Form.Check
                        label="2 Klass"
                        name="group1"
                        type={type}
                        onChange={(e) => handleSelectClass(e)}
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
    </>
  );
}

export default ClassSelector;
