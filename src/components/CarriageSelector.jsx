import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import SeatsSelector from "./SeatsSelector";

function CarriageSelector({ trainSetAndCarriages, train, date }) {
  const [carriagesLayout, setCarriagesLayout] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [allSeatsInCarriage, setAllSeatsInCarriage] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatsToBook, setSeatsToBook] = useState(0); //should be send from the former route

  useEffect(() => {
    const fetchBookdSeats = async () => {
      await fetch(
        `/api/bookingPartsWithDepartureAndArrivalStationInfo/?date=${date}&departureStationDeparture>=${train.departureOffsetA}&arrivalStationArrival<=${train.arrivalOffsetB}&journeyId=${train.journeyId}`
      )
        .then((res) => res.json())
        .then((jsonData) => setBookedSeats(jsonData));
    };

    setSeatsToBook(2); //should get the total travller
    fetchBookdSeats();
  }, [train]);

  useEffect(() => {
    let carriages = [];
    trainSetAndCarriages.map((x) => {
      if (!carriages.includes(x.carriageNumber)) {
        carriages.push(x.carriageNumber);
      }
    });

    setCarriagesLayout(carriages);
  }, [trainSetAndCarriages]);

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

  const chooseCarriage = () => {
    return carriagesLayout.map((x, index) => {
      return (
        <div className="carriage-container" key={x}>
          <p className="ms-5 custom-text">Vagn: {x}</p>
          <SeatsSelector
            trainSetAndCarriages={trainSetAndCarriages}
            carriageNumber={x}
            bookedSeats={bookedSeats}
            handleSelect={handleSelect}
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
            {chooseCarriage()}
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
