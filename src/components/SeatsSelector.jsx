import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CarriageSelector from "./CarriageSelector";

function SeatsSelector({ trainSetAndCarriages, carriageNumber }) {
  const checkSeatNumber = (number) => {
    console.log(number);
  };

  const [carriage, setCarriage] = useState(carriageNumber);

  const RenderSeats = () => {
    return trainSetAndCarriages.map((seat, index) => {
      if (seat.carriageNumber === carriage) {
        return (
          <div
            key={seat.seatId}
            onClick={() => checkSeatNumber(seat.seatId)}
            className="seat d-flex align-items-center m-1"
          >
            {seat.seatNumber}
          </div>
        );
      }
    });
  };

  return (
    <>
      <Container className="slider">
        <Row>{RenderSeats()}</Row>
      </Container>
    </>
  );
}

export default SeatsSelector;
