import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SeatLayoutCalculater from "./SeatLayoutCalculater";

function SeatsSelector({ trainSetAndCarriages, carriageNumber }) {
  const checkSeatNumber = (number) => {
    console.log(number);
  };

  const [carriage, setCarriage] = useState(carriageNumber);

  const renderSeats = () => {
    return (
      <SeatLayoutCalculater
        carriage={carriage}
        trainSetAndCarriages={trainSetAndCarriages}
      />
    );
  };

  return <>{renderSeats()}</>;
}

export default SeatsSelector;
