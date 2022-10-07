import { useEffect } from "react";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import style from "../../public/css/seats.css";

function Seat(props) {
  let carriageNumber = props.carriage;
  let allCarriagesWithSeats = props.trainSetAndCarriages;
  let occupiedSeats = props.occupiedSeats;
  let wheelChairSeats = props.handicapSeats;
  let rightFacingSeats = props.rightFacingSeats;
  let availableSeats = props.availableSeats;
  let customClassName = "";
  let selectedSeats = props.selectedSeats;
  const [activeCarriage, setActiveCarriage] = useState(0);

  return (
    <>
      <Row className="seat-row-container">
        {allCarriagesWithSeats.map((seat, index) => {
          let firstClass = (seat.seatNumber - 1) % 3 === 0;
          let secondClass = (seat.seatNumber - 2) % 4 === 0;
          let isAvaliable = availableSeats.includes(seat.seatId);
          let isBooked = occupiedSeats.includes(seat.seatId);
          let isForWheelChair = wheelChairSeats.includes(seat.seatId);
          let isFacingRight = rightFacingSeats.includes(seat.seatId);
          let isSelected = selectedSeats.includes(seat.seatId);

          if (isSelected && isFacingRight) {
            customClassName = "seat-selected-right";
          }
          if (isSelected && !isFacingRight) {
            customClassName = "seat-selected-left";
          }
          if (isSelected && isForWheelChair) {
            customClassName = "seat-wheelchair-selected";
          }

          if (seat.carriageNumber === carriageNumber) {
            if (isAvaliable && !isSelected) {
              if (isFacingRight) {
                customClassName = "seat-avaliable-right";
              }
              if (!isFacingRight) {
                customClassName = "seat-avaliable-left";
              }
              if (isForWheelChair) {
                customClassName = "seat-wheelchair-free";
              }
            }
            if (isBooked) {
              if (isFacingRight) {
                customClassName = "seat-disabled-right";
              }
              if (!isFacingRight) {
                customClassName = "seat-disabled-left";
              }
              if (isForWheelChair) {
                customClassName = "seat-wheelchair-disabled";
              }
            }
            if (carriageNumber === 1) {
              return (
                <div
                  className={customClassName}
                  key={index}
                  id={seat.seatId}
                  style={firstClass ? { marginBottom: "90px" } : {}}
                  onClick={(e) => props.handleSelect(e)}
                >
                  {seat.seatNumber}
                </div>
              );
            } else {
              return (
                <>
                  <div
                    className={customClassName}
                    key={index}
                    id={seat.seatId}
                    style={secondClass ? { marginBottom: "40px" } : {}}
                    onClick={(e) => props.handleSelect(e)}
                  >
                    {seat.seatNumber}
                  </div>
                  {seat.seatNumber === 28 && seat.bistro === 1 && (
                    <div
                      key={"bistro"}
                      style={{
                        height: "240px",
                        width: "800px",
                        border: "solid",
                      }}
                      className="d-flex align-items-center"
                    >
                      <p className="text-center" key={"bistro"}>
                        Bistro
                      </p>
                    </div>
                  )}
                  {seat.seatNumber === 42 && seat.isHandicapSeat === 1 && (
                    <div
                      key={"locomotive"}
                      style={{
                        height: "240px",
                        width: "450px",
                        border: "solid",
                        backgroundColor: "gray",
                      }}
                      className="d-flex align-items-center"
                    >
                      <p className="text-center" key={"locomotive"}>
                        Locomotive
                      </p>
                    </div>
                  )}
                </>
              );
            }
          }
        })}
      </Row>
    </>
  );
}

export default Seat;
