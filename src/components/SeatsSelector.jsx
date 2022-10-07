import { useEffect } from "react";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Seat from "./Seat";

function SeatsSelector({
  trainSetAndCarriages,
  carriageNumber,
  bookedSeats,
  handleSelect,
  selectedSeats,
}) {
  const [carriage, setCarriage] = useState(carriageNumber);
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [handicapSeats, setHandicapSeats] = useState([]);
  const [rightFacingSeats, setRightFacingSeats] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);

  useEffect(() => {
    let handicapSeatsList = [];
    let rightFacingSeatsList = [];
    let idList = [];
    let availableSeatsList = [];
    bookedSeats.map((seat) => {
      idList.push(seat.seatId);
    });
    setOccupiedSeats(idList);

    trainSetAndCarriages.map((seat) => {
      if (seat.isHandicapSeat === 1) {
        handicapSeatsList.push(seat.seatId);
      }
      if (seat.isFacingRight === 1) {
        rightFacingSeatsList.push(seat.seatId);
      }
      if (!occupiedSeats.includes(seat.seatId)) {
        availableSeatsList.push(seat.seatId);
      }
    });

    setHandicapSeats(handicapSeatsList);
    setAvailableSeats(availableSeatsList);
    setRightFacingSeats(rightFacingSeatsList);
  }, [bookedSeats]);

  const allCarriages = () => {
    return (
      <Seat
        key={"carriage"}
        carriage={carriage}
        occupiedSeats={occupiedSeats}
        handicapSeats={handicapSeats}
        rightFacingSeats={rightFacingSeats}
        trainSetAndCarriages={trainSetAndCarriages}
        availableSeats={availableSeats}
        selectedSeats={selectedSeats}
        handleSelect={handleSelect}
      />
    );
  };

  return <>{allCarriages()}</>;
}

export default SeatsSelector;
