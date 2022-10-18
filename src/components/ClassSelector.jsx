import { useEffect } from "react";
import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useStates } from "../assets/helpers/states";

function ClassSelector({
  totalOccupiedSeats,
  totalSeatsInTrain,
  setWheelChairSeatsFullBooked,
  setPetsCarriageFullBooked,
  seatsToBook,
}) {
  const [firstClassFullBooked, setFirstClassFullBooked] = useState(false);
  const [secondClassFullBooked, setSecondClassFullBooked] = useState(false);

  let s = useStates("booking");
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
      if (
        +totalOccupiedSeats["occupiedFirstClass"] + seatsToBook >
        +totalSeatsInTrain["firstClass"]
      ) {
        setFirstClassFullBooked(true);
      }
      if (
        +totalOccupiedSeats["occupiedSeats"] -
          +totalOccupiedSeats["occupiedFirstClass"] +
          seatsToBook >
        +totalSeatsInTrain["secondClass"]
      ) {
        setSecondClassFullBooked(true);
      }
    } else {
      setFirstClassFullBooked(false);
      setSecondClassFullBooked(false);
      setPetsCarriageFullBooked(false);
      setWheelChairSeatsFullBooked(false);
    }
  }, []);

  const handleSelectClass = (e) => {
    let value = e.target.id;
    if (value === "firstClass") {
      s.ticket.carriageClass = 1;
    }
    if (value === "secondClass") {
      s.ticket.carriageClass = 2;
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
                        key={"1"}
                        label={`1 Klass ${s.ticket.firstClassPrice} kr`}
                        name="group1"
                        type={type}
                        onChange={(e) => handleSelectClass(e)}
                        id="firstClass"
                        value={"firstClass"}
                        checked={s.ticket.carriageClass === 1}
                      />
                    )}
                    {!secondClassFullBooked && (
                      <Form.Check
                        key={"2"}
                        label={`2 Klass ${s.ticket.secondClassPrice} kr`}
                        name="group1"
                        type={type}
                        onChange={(e) => handleSelectClass(e)}
                        id="secondClass"
                        value={"secondClass"}
                        checked={s.ticket.carriageClass === 2}
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