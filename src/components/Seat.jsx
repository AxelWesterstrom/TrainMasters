import { useEffect } from "react";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

function Seat(props) {
  let bgImage = "../images/seat-select-right.svg";
  let rowHeight = "240px";
  let disableSeats = "pointer";

  let carriageNumber = props.carriage;
  let allCarriagesWithSeats = props.trainSetAndCarriages;
  let isAvailable = props.availableSeats;
  let isBooked = props.bookedSeats;

  return (
    <>
      <Row className="seat-row-container" style={{ height: rowHeight }}>
        {allCarriagesWithSeats.map((seat) => {
          if (seat.carriageNumber === carriageNumber) {
            console.log(isBooked);

            let seatClass;
          }
        })}
      </Row>
    </>
  );
}

export default Seat;
