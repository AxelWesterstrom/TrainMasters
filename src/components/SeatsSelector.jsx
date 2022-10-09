import { useEffect } from "react";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Seat from "./Seat";

function SeatsSelector({ trainSetAndCarriages, carriageNumber, bookedSeats }) {
  const [carriage, setCarriage] = useState(carriageNumber);
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [handicapSeats, setHandicapSeats] = useState([]);
  const [rightFacingSeats, setRightFacingSeats] = useState([]);
  const [seatsToBook, setSeatsToBook] = useState(0); //should be send from the former route

  useEffect(() => {
    let idList = [];
    bookedSeats.map((seat) => {
      idList.push(seat.seatId);
    });
    setOccupiedSeats(idList);
    //should get the total travller
    setSeatsToBook(2);
  }, [bookedSeats]);

  useEffect(() => {
    let handicapSeatsList = [];
    let availableSeatsList = [];
    let rightFacingSeatsList = [];
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

    setAvailableSeats(availableSeatsList);
    setHandicapSeats(handicapSeatsList);
    setOccupiedSeats(handicapSeatsList);
    setRightFacingSeats(rightFacingSeatsList);
  }, [trainSetAndCarriages]);

  const allCarriages = () => {
    return (
      <Seat
        key={"carriage"}
        carriage={carriage}
        occupiedSeats={occupiedSeats}
        availableSeats={availableSeats}
        handicapSeats={handicapSeats}
        rightFacingSeats={rightFacingSeats}
        seatsToBook={seatsToBook}
        trainSetAndCarriages={trainSetAndCarriages}
      />
    );
  };

  return <>{allCarriages()}</>;
}

export default SeatsSelector;
