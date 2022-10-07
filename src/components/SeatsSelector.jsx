import { useEffect } from "react";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Seat from "./Seat";

function SeatsSelector({ trainSetAndCarriages, carriageNumber, bookedSeats }) {
  const [carriage, setCarriage] = useState(carriageNumber);
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [handicapSeats, setHandicapSeats] = useState([]);
  const [rightFacingSeats, setRightFacingSeats] = useState([]);
  const [seatsToBook, setSeatsToBook] = useState(0); //should be send from the former route

  useEffect(() => {
    let handicapSeatsList = [];
    let rightFacingSeatsList = [];
    let idList = [];
    bookedSeats.map((seat) => {
      idList.push(seat.seatId);
    });
    setOccupiedSeats(idList);
    //should get the total travller
    setSeatsToBook(2);

    trainSetAndCarriages.map((seat) => {
      if (seat.isHandicapSeat === 1) {
        handicapSeatsList.push(seat.seatId);
      }
      if (seat.isFacingRight === 1) {
        rightFacingSeatsList.push(seat.seatId);
      }
    });

    setHandicapSeats(handicapSeatsList);
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
        seatsToBook={seatsToBook}
        trainSetAndCarriages={trainSetAndCarriages}
      />
    );
  };

  return <>{allCarriages()}</>;
}

export default SeatsSelector;
