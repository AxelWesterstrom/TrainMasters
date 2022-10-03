import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SeatsSelector from "./SeatsSelector";

function CarriageSelector({ showModal, setShowModal, trainSetAndCarriages }) {
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
      console.log(x);
      return (
        <div
          key={x}
          className={slideIndex === index + 1 ? "slide-active-anim" : "slide"}
        >
          <p>Vagn: {x}</p>
          <SeatsSelector
            trainSetAndCarriages={trainSetAndCarriages}
            carriageNumber={x}
          />
        </div>
      );
    });
  };

  const [slideIndex, setSlideIndex] = useState(1);

  const slide = () => {
    if (slideIndex !== carriagesLayout.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === carriagesLayout.length) {
      setSlideIndex(1);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col className="col col-1">
            <img
              alt="left-arrow"
              src="../images/left-arrow.png"
              className="date-arrow-left"
              onClick={() => slide()}
            />
          </Col>
          <Col className="col col-10">{chooseCarriage()}</Col>
          <Col className="col col-1">
            <img
              alt="right-arrow"
              src="../images/right-arrow.png"
              className="date-arrow-right"
              onClick={() => slide()}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default CarriageSelector;
