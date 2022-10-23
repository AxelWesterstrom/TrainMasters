import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CarriageSelector from "./CarriageSelector";
import SeatsSelector from "./SeatsSelector";
import { useStates } from "../assets/helpers/states";
import FilterForSpecialSeats from "./FilterForSpecialSeats";

function ChooseSeatsModal({
  seatsToBook,
  wheechairSeatsFullBooked,
  petsCarraigeFullBooked,
  setWheelChairSeatsFullBooked,
  selectedSeats,
  setSelectedSeats,
  bookedSeats,
}) {
  const [carriagesLayout, setCarriagesLayout] = useState([]);
  const [trainSetAndCarriages, setTrainSetAndCarriages] = useState([]);
  const [route, setRoute] = useState([]);
  const [petsCarriage, setPetsCarriage] = useState(0);
  const [bistroCarriage, setBistroCarriage] = useState(0);
  const [activeCarriage, setActiveCarriage] = useState(0);
  const carriageRefs = useRef([]);
  const [filterOnSeats, setFilterOnSeats] = useState(0);
  const [occupiedSeats, setOccupiedSeats] = useState([]);

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
  }, [carriagesLayout]);

  const handleSelectSeat = (e, carriageNumber, number) => {
    let seatId = +e.target.id;
    let seatList = [];
    if (selectedSeats.length < seatsToBook) {
      seatList = [...selectedSeats];
      if (!seatList.some((seat) => seat.id === seatId)) {
        seatList.push({
          id: seatId,
          seatNumber: number,
          carriage: carriageNumber,
        });
        setSelectedSeats(seatList);
      }
    }
    if (selectedSeats.length >= seatsToBook) {
      seatList = [...selectedSeats];
      seatList = seatList.filter((seat, index) => {
        return index !== 0;
      });

      if (!seatList.some((seat) => seat.id === seatId)) {
        seatList.push({
          id: seatId,
          seatNumber: number,
          carriage: carriageNumber,
        });
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
              handleSelectSeat={handleSelectSeat}
              selectedSeats={selectedSeats}
              occupiedSeats={occupiedSeats}
              filterOnSeats={filterOnSeats}
              setOccupiedSeats={setOccupiedSeats}
              bookedSeats={bookedSeats}
            />
          </div>
        </div>
      );
    });
  };
  const deleteSelectedSeats = () => {
    s.ticket.seat = [];
    setSelectedSeats([]);
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
      <Container className="mb-3 d-flex justify-content-center">
        <Row className="row">
          <Col className="col-md-8 align-items-center">
            <FilterForSpecialSeats
              wheechairSeatsFullBooked={wheechairSeatsFullBooked}
              petsCarraigeFullBooked={petsCarraigeFullBooked}
              setWheelChairSeatsFullBooked={setWheelChairSeatsFullBooked}
              occupiedSeats={occupiedSeats}
              trainSetAndCarriages={trainSetAndCarriages}
              filterOnSeats={filterOnSeats}
              setFilterOnSeats={setFilterOnSeats}
              setOccupiedSeats={setOccupiedSeats}
              carriageRefs={carriageRefs}
              petsCarriage={petsCarriage}
              setActiveCarriage={setActiveCarriage}
            />
          </Col>
          <Col className="col-md-2 ml-auto d-flex align-items-center">
            Rensa
            <img
              src="../images/delete.svg"
              style={{
                width: "14px",
                height: "14px",
                cursor: "pointer",
                marginTop: "3px",
                marginLeft: "5px",
              }}
              onClick={deleteSelectedSeats}
            />
          </Col>
        </Row>
      </Container>

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
