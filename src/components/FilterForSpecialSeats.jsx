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
  carriageRefs,
  petsCarriage,
  setActiveCarriage,
}) {
  useEffect(() => {
    let availableSeats = [];
    trainSetAndCarriages.map((seat) => {
      if (!occupiedSeats.includes(seat.seatId)) {
        availableSeats.push(seat);
      }
    });

    if (s.ticket.carriageClass === 2) {
      availableSeats.map((seat) => {
        if (seat.isHandicapSeat === 1 && seat.firstClass === 0) {
          setWheelChairSeatsFullBooked(false);
        }
      });
    }
    if (s.ticket.carriageClass === 1) {
      availableSeats.map((seat) => {
        if (seat.isHandicapSeat === 1 && seat.firstClass === 1) {
          setWheelChairSeatsFullBooked(false);
        }
      });
    }
  }, [trainSetAndCarriages]);

  const handleSelectFilter = (e) => {
    let value = e.target.value;
    setFilterOnSeats(value);
    if (value == "2") {
      const next = carriageRefs.current[petsCarriage - 1];
      next.scrollIntoView();
      setActiveCarriage(petsCarriage - 1);
    }
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
