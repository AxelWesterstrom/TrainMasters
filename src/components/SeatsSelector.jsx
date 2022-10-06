import { useEffect } from "react";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

function SeatsSelector({ trainSetAndCarriages, carriageNumber, bookedSeats }) {
  const [carriage, setCarriage] = useState(carriageNumber);
  const [bookedSeatsIds, setBookedSeatsIds] = useState([]);
  const [isOnSelect, setIsOnSelect] = useState(false);

  useEffect(() => {
    let idList = [];
    bookedSeats.map((seat) => {
      idList.push(seat.seatId);
    });
    setBookedSeatsIds(idList);
  }, [bookedSeats]);

  //should get the total travller
  const selectSeats = (e, isFacingRight) => {
    setIsOnSelect(true);
  };

  let bgImage = "../images/seat-select-right.svg";
  let rowHeight = "240px";
  let disableSeats = "pointer";

  const renderAllCarraiges = (carriage, trainSetAndCarriages) => {
    return trainSetAndCarriages.map((seat, index) => {
      if (seat.carriageNumber === carriage && carriage === 1) {
        rowHeight = "150px";
        if (seat.isFacingRight === 1) {
          bgImage = "../images/seat-free-right.svg";
        } else {
          bgImage = "../images/seat-free-left.svg";
        }
        if (bookedSeatsIds.includes(seat.seatId)) {
          if (seat.isFacingRight === 1) {
            bgImage = "../images/seat-disabled-right.svg";
          } else {
            bgImage = "../images/seat-disabled-left.svg";
          }
          disableSeats = "";
        } else {
          disableSeats = "pointer";
        }
        return (
          <>
            <div
              className={(seat.seatNumber - 1) % 3 === 0 ? "seat mb-5" : "seat"}
              key={index}
              style={{
                backgroundImage: `url(${bgImage})`,
                cursor: disableSeats,
              }}
              id={seat.seatId}
              onClick={(e) => selectSeats(e)}
            >
              {seat.seatNumber}
            </div>
          </>
        );
      }

      if (seat.carriageNumber === carriage) {
        if (seat.isFacingRight === 1) {
          bgImage = "../images/seat-free-right.svg";
        } else {
          bgImage = "../images/seat-free-left.svg";
        }
        if (bookedSeatsIds.includes(seat.seatId)) {
          if (seat.isFacingRight === 1) {
            bgImage = "../images/seat-disabled-right.svg";
          } else {
            bgImage = "../images/seat-disabled-left.svg";
          }
          disableSeats = "";
        } else {
          disableSeats = "pointer";
        }
        return (
          <>
            <div
              className={(seat.seatNumber - 2) % 4 === 0 ? "seat mb-4" : "seat"}
              key={index}
              style={{
                backgroundImage: `url(${bgImage})`,
                cursor: disableSeats,
              }}
              id={seat.seatId}
              onClick={(e) => selectSeats(e, seat.isFacingRight)}
            >
              {seat.seatNumber}
            </div>
            {seat.seatNumber === 28 && seat.bistro === 1 && (
              <div
                style={{ height: "220px", width: "500px", border: "solid" }}
                className="d-flex align-items-center"
              >
                <p className="text-center">Bistro</p>
              </div>
            )}
          </>
        );
      }
    });
  };

  return (
    <>
      <Row className="seat-row-container" style={{ height: rowHeight }}>
        {renderAllCarraiges(carriage, trainSetAndCarriages)}
      </Row>
    </>
  );
}

export default SeatsSelector;
