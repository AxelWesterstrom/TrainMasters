import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import SeatsSelector from "./SeatsSelector";

function CarriageSelector({ chosenJourney, seatsToBook, date }) {
  const [carriagesLayout, setCarriagesLayout] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [trainSetAndCarriages, setTrainSetAndCarriages] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `/api/carriagesWithSeats/?trainsetId=${chosenJourney.trainSetId}}`
      )
        .then((res) => res.json())
        .then((jsonData) => setTrainSetAndCarriages(jsonData));
    };
    fetchData();
  }, [chosenJourney]);

  useEffect(() => {
    const fetchBookdSeats = async () => {
      await fetch(
        `/api/bookingPartsWithDepartureAndArrivalStationInfo/?date=${date}&departureStationDeparture>=${chosenJourney.departureOffsetA}&arrivalStationArrival<=${chosenJourney.arrivalOffsetB}&journeyId=${chosenJourney.journeyId}`
      )
        .then((res) => res.json())
        .then((jsonData) => setBookedSeats(jsonData));
    };

    fetchBookdSeats();
  }, [chosenJourney, date]);

  useEffect(() => {
    let carriages = [];
    trainSetAndCarriages.map((x) => {
      if (!carriages.includes(x.carriageNumber)) {
        carriages.push(x.carriageNumber);
      }
    });

    setCarriagesLayout(carriages);
  }, [trainSetAndCarriages]);

  const handleSelectSeat = (e) => {
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

  const renderAllCarriages = () => {
    return carriagesLayout.map((x, index) => {
      return (
        <div className="carriage-container" key={x}>
          <p className="ms-5 custom-text">Vagn: {x}</p>
          <SeatsSelector
            trainSetAndCarriages={trainSetAndCarriages}
            carriageNumber={x}
            bookedSeats={bookedSeats}
            handleSelectSeat={handleSelectSeat}
            selectedSeats={selectedSeats}
          />
        </div>
      );
    });
  };

  const slideLeft = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 150;
  };

  const slideRight = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 150;
  };

  return (
    <>
      <div className="ms-4 mt-1 mb-3 d-flex">
        <div className="col col-lg-4 col-xs-10">
          <Form.Select>
            <option>Ospecificerad plats</option>
            <option value="1">Handikapplats rullstol</option>
            <option value="2">Djur tillåtet</option>
          </Form.Select>
        </div>
        <div className="col col-4 ms-4">
          <div></div>
        </div>
      </div>
      <div className="d-flex">
        <div className="col col-1 d-flex align-items-center">
          <img
            alt="left-arrow"
            src="../images/arrow-left-date.svg"
            className="date-arrow-left"
            onClick={slideLeft}
          />
        </div>
        <div className="col col-10 seat-picker-container">
          <div id="slider" className="slider">
            {renderAllCarriages()}
          </div>
        </div>
        <div className="col col-1 d-flex align-items-center">
          <img
            alt="right-arrow"
            src="../images/arrow-right-date.svg"
            className="date-arrow-right"
            onClick={slideRight}
          />
        </div>
      </div>
    </>
  );
}
export default CarriageSelector;
