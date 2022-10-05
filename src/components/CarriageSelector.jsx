import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SeatsSelector from "./SeatsSelector";

function CarriageSelector({ trainSetAndCarriages }) {
  const [carriagesLayout, setCarriagesLayout] = useState([]);

  useEffect(() => {
    let carriages = [];

    trainSetAndCarriages.map((x) => {
      if (!carriages.includes(x.carriageNumber)) {
        carriages.push(x.carriageNumber);
      }
    });
    setCarriagesLayout(carriages);
  }, [trainSetAndCarriages]);

  const chooseCarriage = () => {
    return carriagesLayout.map((x, index) => {
      return (
        <div className="carriage-container" key={x}>
          <p className="ms-5">Vagn: {x}</p>
          <SeatsSelector
            trainSetAndCarriages={trainSetAndCarriages}
            carriageNumber={x}
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
      <div className="d-flex">
        <div className="col col-1 d-flex align-items-center">
          <img
            alt="left-arrow"
            src="../images/left-arrow.png"
            className="date-arrow-left"
            onClick={slideLeft}
          />
        </div>
        <div id="slider" className="slider">
          {chooseCarriage()}
        </div>
        <div className="col col-1 d-flex align-items-center">
          <img
            alt="right-arrow"
            src="../images/right-arrow.png"
            className="date-arrow-right"
            onClick={slideRight}
          />
        </div>
      </div>
    </>
  );
}
export default CarriageSelector;
