import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import JourneyList from "../components/JourneyList";
import DateSlider from "../components/DateSlider";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../../public/css/journey.css";
import { useNavigate } from "react-router-dom";

function PickJourney() {
  const [date, setDate] = useState("2022-09-26");
  // const [journeys, setJourneys] = useState([]);
  const [departure, setDeparture] = useState("Trelleborg");
  const [arrival, setArrival] = useState("Malmö C");
  const navigate = useNavigate();

  /* useEffect(() => {
    async function fetchData() {
      let data = await fetch(
        `/api/connectStationsOnJourneyId?stationNameA=${departure}&stationNameB=${arrival}`
      );
      setJourneys(await data.json());
    }
    fetchData();
    console.log("Journeys", journeys);
  }, []);*/

  const goToNextPage = () => {
    //if (!journey.length === 0) {
    navigate("/anpassa-resa", { state: { departure, arrival } });
    //  }
  };

  return (
    <div className="pickJourney">
      <Header />
      <div>
        <img
          alt="arrowBack"
          src="../images/arrow-left.svg"
          className="mt-2 ms-3 mb-2 back-button"
          onClick={() => navigate(-1)}
        />
      </div>

      <Container className="journeyContainer">
        <Container className="custom-container">
          <Row className="d-flex justify-content-between">
            <Col className="d-flex justify-content-start">
              <p className="custom-label">Resa från</p>
            </Col>
            <Col className="d-flex justify-content-end">
              <p className="custom-label">Resa till</p>
            </Col>
          </Row>
          <Row className="d-flex justify-content-between">
            <Col className="d-flex justify-content-start">
              <p className="custom-label">{departure}</p>
            </Col>
            <Col className="d-flex justify-content-end">
              <p className="custom-label">{arrival}</p>
            </Col>
          </Row>
        </Container>
        <DateSlider {...{ date, setDate }} />

        <Container className="pe-2 ps-2">
          <Container className="info">
            <Row className="journeyList">
              <JourneyList {...{ departure, arrival }} />
            </Row>
          </Container>
        </Container>

        <Container className="d-flex justify-content-end p-5 info">
          <Button className="custom-button mt-3 mb-5" onClick={goToNextPage}>
            Fortsätt
          </Button>
        </Container>
      </Container>
    </div>
  );
}
export default PickJourney;
