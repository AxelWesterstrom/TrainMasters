import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import JourneyList from "../components/JourneyList";
import DateSlider from "../components/DateSlider";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "../../public/css/journey.css";
import "../../public/css/home.css";
import { useNavigate } from "react-router-dom";

function PickJourney() {
  const [date, setDate] = useState("2022-09-26");
  // const [journeys, setJourneys] = useState([]);
  const [departure, setDeparture] = useState("Stockholm C");
  const [arrival, setArrival] = useState("Göteborg C");
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
    <div className='pickJourney'>
      <div className='header'>
        <Header />
      </div>
      <Container className='journeyContainer'>
        <Row className='justify-content-start'>
          <Col className='mt-3'>
            <img
              alt='arrowBack'
              src='arrow-back.svg'
              width='100'
              height='100'
              onClick={() => navigate(-1)}
            />
          </Col>
        </Row>
        <Row className='departAndArrivalStations'>
          <Col id='departure'>
            <h2>Resa från</h2>
            <br></br>
            <h2>{departure}</h2>
          </Col>
          <Col id='arrival' className='text-align-center'>
            <h2>Resa till</h2>
            <br></br>
            <h2>{arrival}</h2>
          </Col>
        </Row>
        <DateSlider {...{ date, setDate }} />
        <Row id='journeyList'>
          <JourneyList {...{ departure, arrival }} />
        </Row>
        <Row className='d-flex justify-content-end'>
          <Col className='col-2'>
            <Button className='customButton mt-5' onClick={goToNextPage}>
              Fortsätt
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default PickJourney;
