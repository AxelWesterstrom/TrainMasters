import { useEffect } from "react";
import { useState } from "react";
import Seat from "./Seat";
import { useStates } from "../assets/helpers/states";

function SeatsSelector({
  trainSetAndCarriages,
  carriageNumber,
  bookedSeats,
  handleSelectSeat,
  selectedSeats,
  occupiedSeats,
  filterOnSeats,
  setOccupiedSeats,
}) {
  const [carriage, setCarriage] = useState(carriageNumber);
  const [handicapSeats, setHandicapSeats] = useState([]);
  const [rightFacingSeats, setRightFacingSeats] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [filteredSeatsOnClass, setFilteredSeatsOnClass] = useState([]);
  let s = useStates("booking");

  useEffect(() => {
    let idList = [];
    if (bookedSeats !== 0) {
      bookedSeats.map((seat) => {
        idList.push(seat.seatId);
      });

      if (s.ticket.carriageClass === 1) {
        trainSetAndCarriages.map((seat) => {
          if (seat.firstClass === 0) {
            idList.push(seat.seatId);
          }
        });
      }

      if (s.ticket.carriageClass === 2) {
        trainSetAndCarriages.map((seat) => {
          if (seat.firstClass === 1) {
            idList.push(seat.seatId);
          }
        });
      }
    }

    if (bookedSeats === 0) {
      if (s.ticket.carriageClass === 1) {
        trainSetAndCarriages.map((seat) => {
          if (seat.firstClass === 0) {
            idList.push(seat.seatId);
          }
        });
      }

      if (s.ticket.carriageClass === 2) {
        trainSetAndCarriages.map((seat) => {
          if (seat.firstClass === 1) {
            idList.push(seat.seatId);
          }
        });
      }
    }
    setFilteredSeatsOnClass(idList);
    setOccupiedSeats(idList);
  }, [s.ticket.carriageClass, bookedSeats, trainSetAndCarriages]);

  useEffect(() => {
    let availableSeatsList = [];
    let handicapSeatsList = [];
    let rightFacingSeatsList = [];
    let occupiedSeatsList = [];

    if (filterOnSeats == "0") {
      occupiedSeatsList = [...filteredSeatsOnClass];

      trainSetAndCarriages.map((seat) => {
        if (seat.isHandicapSeat === 1) {
          handicapSeatsList.push(seat.seatId);
        }
        if (seat.isFacingRight === 1) {
          rightFacingSeatsList.push(seat.seatId);
        }
        if (!filteredSeatsOnClass.includes(seat.seatId)) {
          availableSeatsList.push(seat.seatId);
        }
      });
      setOccupiedSeats(occupiedSeatsList);
    }

    if (filterOnSeats == "1") {
      availableSeatsList = [];
      occupiedSeatsList = [...filteredSeatsOnClass];
      trainSetAndCarriages.map((seat) => {
        if (
          !filteredSeatsOnClass.includes(seat.seatId) &&
          seat.isHandicapSeat === 0
        ) {
          occupiedSeatsList.push(seat.seatId);
        }
        if (
          !occupiedSeatsList.includes(seat.seatId) &&
          !filteredSeatsOnClass.includes(seat.seatId) &&
          seat.isHandicapSeat === 1
        ) {
          availableSeatsList.push(seat.seatId);
        }
        if (seat.isFacingRight === 1) {
          rightFacingSeatsList.push(seat.seatId);
        }
        if (seat.isHandicapSeat === 1) {
          handicapSeatsList.push(seat.seatId);
        }
      });

      setOccupiedSeats(occupiedSeatsList);
    }

    if (filterOnSeats == "2") {
      availableSeatsList = [];
      occupiedSeatsList = [...filteredSeatsOnClass];
      trainSetAndCarriages.map((seat) => {
        if (
          !filteredSeatsOnClass.includes(seat.seatId) &&
          seat.petsAllowed === 0
        ) {
          occupiedSeatsList.push(seat.seatId);
        }
        if (
          !occupiedSeatsList.includes(seat.seatId) &&
          !filteredSeatsOnClass.includes(seat.seatId) &&
          seat.petsAllowed === 1
        ) {
          availableSeatsList.push(seat.seatId);
        }

        if (seat.isFacingRight === 1) {
          rightFacingSeatsList.push(seat.seatId);
        }
        if (seat.isHandicapSeat === 1) {
          handicapSeatsList.push(seat.seatId);
        }
      });

      setOccupiedSeats(occupiedSeatsList);
    }

    setHandicapSeats(handicapSeatsList);
    setAvailableSeats(availableSeatsList);
    setRightFacingSeats(rightFacingSeatsList);
  }, [filterOnSeats]);

  const renderAllSeats = () => {
    return (
      <Seat
        key={carriage}
        carriage={carriage}
        occupiedSeats={occupiedSeats}
        handicapSeats={handicapSeats}
        rightFacingSeats={rightFacingSeats}
        trainSetAndCarriages={trainSetAndCarriages}
        availableSeats={availableSeats}
        selectedSeats={selectedSeats}
        handleSelectSeat={handleSelectSeat}
      />
    );
  };

  return <>{renderAllSeats()}</>;
}

export default SeatsSelector;
