import { useEffect } from "react";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import style from "../../public/css/seats.css";

function Seat(props) {
  let carriageNumber = props.carriage;
  let allCarriagesWithSeats = props.trainSetAndCarriages;
  let avaliableSeats = props.availableSeats;
  let occupiedSeats = props.occupiedSeats;
  let wheelChairSeats = props.handicapSeats;
  let rightFacingSeats = props.rightFacingSeats;
  let customClassName = "";
  let seatsToBook = props.seatsToBook;

  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSelect = (e) => {
    let seatId = +e.target.id;
    let seatList = [];
    if (selectedSeats.length < seatsToBook) {
      seatList = [...selectedSeats];
      if (!seatList.includes(seatId)) {
        seatList.push(seatId);
        setSelectedSeats(seatList);
      }
    }
    if (selectedSeats.length === seatsToBook) {
      seatList = [...selectedSeats];
      seatList.shift();
      if (!seatList.includes(seatId)) {
        seatList.push(seatId);
        setSelectedSeats(seatList);
      }
    }
  };
  console.log(selectedSeats);
  return (
    <>
      <Row className="seat-row-container">
        {allCarriagesWithSeats.map((seat, index) => {
          let firstClass = (seat.seatNumber - 1) % 3 === 0;
          let secondClass = (seat.seatNumber - 2) % 4 === 0;
          let isAvaliable = avaliableSeats.includes(seat.seatId);
          let isBooked = occupiedSeats.includes(seat.seatId);
          let isForWheelChair = wheelChairSeats.includes(seat.seatId);
          let isFacingRight = rightFacingSeats.includes(seat.seatId);
          let isSelected = selectedSeats.includes(seat.seatId);

          if (seat.carriageNumber === carriageNumber) {
            if (isAvaliable && isFacingRight) {
              customClassName = "seat-avaliable-right";
            }
            if (isAvaliable && !isFacingRight) {
              customClassName = "seat-avaliable-left";
            }
            if (isAvaliable && isForWheelChair) {
              customClassName = "seat-wheelchair-free";
            }
            if (isBooked && isFacingRight) {
              customClassName = "seat-disabled-right";
            }
            if (isBooked && !isFacingRight) {
              customClassName = "seat-disabled-left";
            }
            if (isBooked && isForWheelChair) {
              customClassName = "seat-wheelchair-disabled";
            }
            if (isSelected && isFacingRight) {
              console.log("hej");
              customClassName = "seat-selected-right";
            }
            if (isSelected && !isFacingRight) {
              customClassName = "seat-selected-left";
            }
            if (isSelected && isForWheelChair) {
              customClassName = "seat-wheelchair-selected";
            }
            if (carriageNumber === 1) {
              return (
                <div
                  className={customClassName}
                  key={index}
                  id={seat.seatId}
                  style={firstClass ? { marginBottom: "90px" } : {}}
                  onClick={(e) => handleSelect(e)}
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
                    onClick={(e) => handleSelect(e)}
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
