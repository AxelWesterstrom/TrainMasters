import { useEffect } from "react";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Seat from "./Seat";

function SeatsSelector({ trainSetAndCarriages, carriageNumber, bookedSeats }) {
  const [carriage, setCarriage] = useState(carriageNumber);
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [avaliableSeats, setAvaliableSeats] = useState([]);
  const [handicapSeats, setHandicapSeats] = useState([]);
  const [rightFacingSeats, setRightFacingSeats] = useState([]);
  const [seatsToBook, setSeatsToBook] = useState([]); //should be send from the former route
  let rowHeight = "240px";

  useEffect(() => {
    let idList = [];
    bookedSeats.map((seat) => {
      idList.push(seat.seatId);
    });
    setOccupiedSeats(idList);
  }, [bookedSeats]);

  //should get the total travller
  const selectSeats = (e) => {};

  useEffect(() => {
    let handicapSeatsList = [];
    let avaliableSeatsList = [];
    let rightFacingSeatsList = [];
    trainSetAndCarriages.map((seat) => {
      if (seat.isHandicapSeat === 0) {
        handicapSeatsList.push(seat.seatId);
      }
      if (seat.isFacingRight === 0) {
        rightFacingSeatsList.push(seat.seatId);
      }
      if (!occupiedSeats.includes(seat.seatId)) {
        avaliableSeatsList.push(seat.seatId);
      }
    });

    setAvaliableSeats(avaliableSeatsList);
    setHandicapSeats(handicapSeatsList);
    setOccupiedSeats(handicapSeatsList);
  }, [bookedSeats, trainSetAndCarriages]);

  const allCarriages = () => {
    return (
      <Seat
        carriage={carriage}
        occupiedSeats={occupiedSeats}
        avaliableSeats={avaliableSeats}
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
