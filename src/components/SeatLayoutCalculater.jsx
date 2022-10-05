import { Row } from "react-bootstrap";

function SeatLayoutCalculater({ carriage, trainSetAndCarriages }) {
  let bgImage;
  let rowHeight = "190px";
  let firstRow = [];
  let secondRow = [];
  let thirdRow = [];
  let fourthRow = [];

  const renderAllCarraiges = (carriage, trainSetAndCarriages) => {
    console.log(carriage);
    return trainSetAndCarriages.map((seat, index) => {
      if (seat.carriageNumber === carriage && carriage === 1) {
        rowHeight = "140px";
        if (seat.isFacingRight === 1) {
          bgImage = "../images/seat-towards-right.svg";
        } else {
          bgImage = "../images/seat.svg";
        }
        return (
          <>
            <div
              className={(seat.seatNumber - 1) % 3 === 0 ? "seat mb-4" : "seat"}
              key={index}
              id={seat.seatNumber}
              style={{
                backgroundImage: `url(${bgImage})`,
              }}
            >
              <p className="text-center">{seat.seatNumber}</p>
            </div>
          </>
        );
      }
      if (seat.carriageNumber === carriage && carriage === 2) {
        if (seat.isFacingRight === 1) {
          bgImage = "../images/seat-towards-right.svg";
        } else {
          bgImage = "../images/seat.svg";
        }
        return (
          <>
            <div
              className="seat"
              key={index}
              style={{ backgroundImage: `url(${bgImage})` }}
            >
              {seat.seatNumber}
            </div>
          </>
        );
      }
      if (seat.carriageNumber === carriage && carriage === 3) {
        if (seat.isFacingRight === 1) {
          bgImage = "../images/seat-towards-right.svg";
        } else {
          bgImage = "../images/seat.svg";
        }
        return (
          <>
            <div
              className="seat"
              key={index}
              style={{ backgroundImage: `url(${bgImage})` }}
            >
              {seat.seatNumber}
            </div>
          </>
        );
      }
      if (seat.carriageNumber === carriage && carriage === 4) {
        let bistro;
        if (seat.isFacingRight === 1) {
          bgImage = "../images/seat-towards-right.svg";
        } else {
          bgImage = "../images/seat.svg";
        }
        if (
          trainSetAndCarriages.indexOf(seat) ==
          trainSetAndCarriages.length - 1
        ) {
          bistro = (
            <div
              style={{ height: "160px", width: "400px", border: "solid" }}
              className="d-flex align-items-center"
            >
              <p>Bistro</p>
            </div>
          );
        }
        return (
          <>
            <div
              className="seat"
              key={index}
              style={{ backgroundImage: `url(${bgImage})` }}
            >
              {seat.seatNumber}
            </div>
            {bistro}
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

export default SeatLayoutCalculater;
