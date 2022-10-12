import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import CarriageSelector from "./CarriageSelector";
import SeatsSelector from "./SeatsSelector";
import { useStates } from "../assets/helpers/states";

function ChooseSeatsModal({
  seatsToBook,
  wheechairSeatsFullBooked,
  petsCarraigeFullBooked,
  firstClass,
  secondClass,
}) {
  const [carriagesLayout, setCarriagesLayout] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [trainSetAndCarriages, setTrainSetAndCarriages] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [route, setRoute] = useState([]);
  const [petsCarriage, setPetsCarriage] = useState(0);
  const [bistroCarriage, setBistroCarriage] = useState(0);
  const [activeCarriage, setActiveCarriage] = useState(0);
  const carriageRefs = useRef([]);

  let s = useStates("booking");

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `/api/carriagesWithSeats/?trainsetId=${s.ticket.chosenJourney.trainSetId}}`
      )
        .then((res) => res.json())
        .then((jsonData) => setTrainSetAndCarriages(jsonData));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchBookdSeats = async () => {
      await fetch(
        `/api/bookingPartsWithDepartureAndArrivalStationInfo/?date=${
          new Date(s.ticket.date).toISOString().split("T")[0]
        }&departureStationDeparture>=${
          s.ticket.chosenJourney.departureOffsetA
        }&arrivalStationArrival<=${
          s.ticket.chosenJourney.arrivalOffsetB
        }&journeyId=${s.ticket.chosenJourney.journeyId}`
      )
        .then((res) => res.json())
        .then((jsonData) => {
          if (jsonData[0] !== undefined) {
            setBookedSeats(jsonData[0]);
          } else {
            setBookedSeats(0);
          }
        });
    };
    fetchBookdSeats();
  }, []);

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
      await fetch(`/api/routes/?id=${s.ticket.chosenJourney.routeId}`)
        .then((res) => res.json())
        .then((jsonData) => setRoute(jsonData[0]));
    };
    fetchData();
  }, []);

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

  const checkScroll = () => {
    let ref;
    carriageRefs.current.map((x, index) => {
      ref = x;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveCarriage(index);
          }
        },
        { rootMargin: "0px -50% 0px -50%" }
      );

      observer.observe(ref);

      return () => observer.unobserve(ref);
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
          key={x}
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
            <option value="0">Ospecificerad plats</option>
            {!wheechairSeatsFullBooked && (
              <option value="1">Handikapplats(rullstol)</option>
            )}
            {!petsCarraigeFullBooked && (
              <option value="2">Djur tillåtet</option>
            )}
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
        <div className="col col-11">
          <div className="slider-train ms-4">
            <CarriageSelector
              carriagesLayout={carriagesLayout}
              activeCarriage={activeCarriage}
              setActiveCarriage={setActiveCarriage}
              carriageRefs={carriageRefs}
              bistroCarriage={bistroCarriage}
            />
          </div>
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
          <div id="slider" className="slider" onScroll={checkScroll}>
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
export default ChooseSeatsModal;
