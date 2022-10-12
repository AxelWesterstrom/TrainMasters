import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useStates } from "../assets/helpers/states";

function FilterForSpecialSeats({
  wheechairSeatsFullBooked,
  petsCarraigeFullBooked,
  setWheelChairSeatsFullBooked,
  occupiedSeats,
  trainSetAndCarriages,
  setFilterOnSeats,
}) {
  useEffect(() => {
    let availableSeats = [];
    trainSetAndCarriages.map((seat) => {
      if (!occupiedSeats.includes(seat.seatId)) {
        availableSeats.push(seat);
      }
    });
    setWheelChairSeatsFullBooked(
      availableSeats.some((seat) => {
        seat.isHandicapSeat === 1;
      })
    );
  }, [trainSetAndCarriages]);

  const handleSelectFilter = (e) => {
    let value = e.target.value;
    setFilterOnSeats(value);
  };

  let s = useStates("booking");

  return (
    <Form.Select onChange={(e) => handleSelectFilter(e)}>
      <option value="0">Ospecificerad plats</option>
      {!wheechairSeatsFullBooked && (
        <option value="1">Handikapplats(rullstol)</option>
      )}
      {!petsCarraigeFullBooked && s.ticket.carriageClass !== 1 && (
        <option value="2">Djur tillåtet</option>
      )}
    </Form.Select>
  );
}
export default FilterForSpecialSeats;
