import React from "react";
import { useState, useEffect } from "react";
import Journey from "./Journey";
import "../../public/css/journey.css";

function JourneyList(props) {
  let {
    date,
    departure,
    arrival,
    chosenJourney,
    setChosenJourney,
    formatDate
  } = props;
  const [journeys, setJourneys] = useState([]);
  const [weekday, setWeekday] = useState(true);
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let data = await fetch(
        `/api/connectStationsWithTimesOnJourneyId?stationNameA=${departure}&stationNameB=${arrival}`
      );
      setJourneys(await data.json());
      let holidayData = await fetch("/api/holidays");
      setHolidays(await holidayData.json());
    }
    fetchData();
  }, []);

  useEffect(() => {
    function weekdayCheck() {
      let day = new Date(date).getDay();
      let isHoliday = false;
      for (let i = 0; i < holidays.length; i++) {
        let holidayDate = new Date(holidays[i].date);
        let holidayDateString = formatDate(holidayDate);
        if (holidayDateString === date) {
          isHoliday = true;
          break;
        } else {
          isHoliday = false;
        }
      }
      console.log(isHoliday);
      if (isHoliday || day === 6 || day === 0) {
        setWeekday(false);
      } else {
        setWeekday(true);
      }
    }
    weekdayCheck(date);
  }, [date]);

  function handleClickedJourney(journey) {
    setChosenJourney({ ...journey });
  }

  return (
    <>
      {!!weekday &&
        journeys.map((journey, index) => (
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
      {!weekday &&
        journeys
          .filter(journey => journey.justOnWeekdays === 0)
          .map((journey, index) => (
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
