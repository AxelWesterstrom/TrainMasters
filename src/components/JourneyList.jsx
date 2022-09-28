import React from "react";
import { useState, useEffect } from "react";
import Journey from "./Journey";
import "../../public/css/journey.css";

function JourneyList(props) {
  let { date, departure, arrival, chosenJourney, setChosenJourney } = props;
  const [journeys, setJourneys] = useState([]);
  const [weekday, setWeekday] = useState(true);
  let holidays;

  useEffect(() => {
    async function fetchData() {
      let holidayData = await fetch(`/api/holidays/1`);
      holidays = await holidayData.json();
      let data = await fetch(
        `/api/connectStationsWithTimesOnJourneyId?stationNameA=${departure}&stationNameB=${arrival}`
      );
      setJourneys(await data.json());
      console.log(holidays);
    }
    fetchData();
  }, []);

  useEffect(() => {
    () => {
      console.log("Running datecheck");
      let d = new Date(date);
      let day = d.getDay();
      if (/*holidays.includes(date) ||*/ day === 6 || day === 5) {
        console.log("it is a holiday");
        setWeekday(false);
      }
    };
  }, [date]);

  function handleClickedJourney(journey) {
    setChosenJourney({ ...journey });
  }

  return (
    <>
      {journeys.map((journey, index) => (
        <Journey
          key={index}
          {...{
            weekday,
            journey,
            chosenJourney,
            setChosenJourney,
            handleClickedJourney
          }}
        />
      ))}
    </>
  );
}
export default JourneyList;
