import React, { useState, useRef, useMountEffect } from "react";
import { useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import SeatsSelector from "./SeatsSelector";

function CarriageSelector({ chosenJourney, seatsToBook, date }) {
  const [carriagesLayout, setCarriagesLayout] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [trainSetAndCarriages, setTrainSetAndCarriages] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [route, setRoute] = useState([]);
  const [petsCarriage, setPetsCarriage] = useState(0);
  const [bistroCarriage, setBistroCarriage] = useState(0);

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
      if (x.seatNumber === 42 && x.petsAllowed === 1) {
        setPetsCarriage(x.carriageNumber);
      }
      if (x.seatNumber === 28 && x.bistro === 1) {
        setBistroCarriage(x.carriageNumber);
      }
    });

    setCarriagesLayout(carriages);
  }, [trainSetAndCarriages]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`/api/routes/?id=${chosenJourney.routeId}`)
        .then((res) => res.json())
        .then((jsonData) => setRoute(jsonData[0]));
    };
    fetchData();
  }, [chosenJourney]);

  const carriageRefs = useRef([]);

  const handleSelectCarriage = (idx) => () => {
    const next = carriageRefs.current[idx];
    next.scrollIntoView();
  };

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

  const renderTrainLayout = () => {
    return carriagesLayout.map((x, index) => {
      return (
        <>
          {index === 0 && (
            <div
              style={{ display: "inline-block" }}
              onClick={handleSelectCarriage(index)}
              className="carriage-indicator"
            >
              <p className="ms-5 custom-text text-center">Vagn: {x}</p>
              <img
                src="../images/locomotive.svg"
                style={{ width: "400px", height: "51px" }}
              />
            </div>
          )}
          {index !== carriagesLayout.length - 1 && index !== 0 && (
            <div
              style={{ display: "inline-block" }}
              onClick={handleSelectCarriage(index)}
              className="carriage-indicator"
            >
              <p className="ms-5 custom-text">Vagn: {x}</p>
              <img
                src="../images/carriage.svg"
                style={{ width: "190px", height: "51px" }}
              />
            </div>
          )}
          {index !== carriagesLayout.length - 1 &&
            index !== 0 &&
            x === bistroCarriage && (
              <div
                style={{ display: "inline-block" }}
                onClick={handleSelectCarriage(index)}
                className="carriage-indicator"
              >
                <p className="ms-5 custom-text">Vagn: {x}</p>
                <img
                  src="../images/bistro.svg"
                  style={{ width: "190px", height: "51px" }}
                />
              </div>
            )}
          {index === carriagesLayout.length - 1 && (
            <div
              style={{ display: "inline-block" }}
              onClick={handleSelectCarriage(index)}
              className="carriage-indicator"
            >
              <p className="ms-5 custom-text">Vagn: {x}</p>
              <img
                src="../images/maneuvering.svg"
                style={{ width: "215px", height: "51px" }}
              />
            </div>
          )}
        </>
      );
    });
  };

  const renderAllCarriages = () => {
    return carriagesLayout.map((x, index) => {
      return (
        <div
          className="carriage-container"
          ref={(el) => {
            carriageRefs.current[index] = el;
          }}
        >
          <div
            style={
              x === petsCarriage
                ? {
                    border: "solid",
                    backgroundImage: `url("../images/dog.svg")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "50px",
                  }
                : { border: "solid" }
            }
          >
            <SeatsSelector
              trainSetAndCarriages={trainSetAndCarriages}
              carriageNumber={x}
              bookedSeats={bookedSeats}
              handleSelectSeat={handleSelectSeat}
              selectedSeats={selectedSeats}
              chosenJourney={chosenJourney}
            />
          </div>
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
      </div>
      <div className="ms-2">
        {route["isDirectionLeft"] === 0 && (
          <p className="ms-5 custom-text">
            Planerad färdriktning
            <img
              src="../images/arrow-right-date.svg"
              style={{ width: "35px", height: "35px" }}
            />
          </p>
        )}
        {route["isDirectionLeft"] === 1 && (
          <p className="ms-5 custom-text">
            <img
              src="../images/arrow-left-date.svg"
              style={{ width: "35px", height: "35px" }}
            />
            Planerad färdriktning
          </p>
        )}
        <div className="slider-train ms-4">{renderTrainLayout()}</div>
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
