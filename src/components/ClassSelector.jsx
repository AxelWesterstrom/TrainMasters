import { useEffect } from "react";
import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useStates } from "../assets/helpers/states";

function ClassSelector({
  totalSeatsInTrain,
  setWheelChairSeatsFullBooked,
  setPetsCarriageFullBooked,
  seatsToBook,
  bookedSeats,
}) {
  const [firstClassFullBooked, setFirstClassFullBooked] = useState(false);
  const [secondClassFullBooked, setSecondClassFullBooked] = useState(false);
  const [bookedFirstClass, setBookedFirstClass] = useState(0);
  const [bookedPetsSeats, setBookedPetsSeats] = useState(0);
  const [bookedSecondClass, setBookedSecondClass] = useState(0);
  const [bookedWheelchair, setBookedWheelchair] = useState(0);

  let s = useStates("booking");

  useEffect(() => {
    let countF = 0;
    let countP = 0;
    let countS = 0;
    let countW = 0;

    bookedSeats.map((seat) => {
      if (seat.firstClass === 1) {
        countF += 1;
      }
      if (seat.firstClass === 0) {
        countS += 1;
      }
      if (seat.petsAllowed === 1) {
        countP += 1;
      }
      if (seat.isHandicapSeat === 1) {
        countW += 1;
      }
    });
    setBookedFirstClass(countF);
    setBookedSecondClass(countS);
    setBookedPetsSeats(countP);
    setBookedWheelchair(countW);
  }, [bookedSeats, totalSeatsInTrain]);

  useEffect(() => {
    if (bookedFirstClass === +totalSeatsInTrain["firstClass"]) {
      setFirstClassFullBooked(true);
    }
    if (bookedSecondClass === +totalSeatsInTrain["secondClass"]) {
      setSecondClassFullBooked(true);
    }
    if (bookedPetsSeats === +totalSeatsInTrain["petsAllowed"]) {
      setPetsCarriageFullBooked(true);
    }
    if (bookedWheelchair === +totalSeatsInTrain["hasHandicapSeats"]) {
      setWheelChairSeatsFullBooked(true);
    }
    if (bookedFirstClass + seatsToBook > +totalSeatsInTrain["firstClass"]) {
      setFirstClassFullBooked(true);
    }
    if (bookedSecondClass + seatsToBook > +totalSeatsInTrain["secondClass"]) {
      setSecondClassFullBooked(true);
    }
  }, [bookedFirstClass, bookedSecondClass, bookedPetsSeats, bookedWheelchair]);

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
          <Container className="class-selector-container p-4">
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