import React from "react";
import { useState, useEffect } from "react";
import Journey from "./Journey";
import "../../public/css/journey.css";
import { useStates } from "../assets/helpers/states";

function JourneyList() {
  let s = useStates("booking");
  let l = useStates({
    journeys: [],
    weekday: true,
    holidays: []
  });

  useEffect(() => {
    (async () => {
      l.journeys = await (
        await fetch(
          `/api/connectStationsWithTimesOnJourneyId?stationNameA=${s.ticket.departure}&stationNameB=${s.ticket.arrival}`
        )
      ).json();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      l.holidays = await (await fetch("/api/holidays")).json();
    })();
  }, []);

  useEffect(() => {
    function weekdayCheck() {
      let day = new Date(s.ticket.date).getDay();
      let isHoliday = false;
      for (let i = 0; i < l.holidays.length; i++) {
        let holidayDate = new Date(l.holidays[i].date).toLocaleDateString(
          "sv-SE"
        );
        if (
          holidayDate === new Date(s.ticket.date).toLocaleDateString("sv-SE")
        ) {
          isHoliday = true;
          break;
        } else {
          isHoliday = false;
        }
      }

      if (isHoliday || day === 0 || day === 1) {
        l.weekday = false;
      } else {
        l.weekday = true;
      }
    }
    weekdayCheck(s.ticket.date);
  }, [s.ticket.date]);

  function checkTime(journey) {
    let departureHours = journey.departureTimeA.substring(
      0,
      journey.departureTimeA.indexOf(":")
    );
    let departureMinutes = journey.departureTimeA.substring(
      journey.departureTimeA.indexOf(":") + 1
    );
    let arrivalHours = journey.arrivalTimeB.substring(
      0,
      journey.arrivalTimeB.indexOf(":")
    );
    let arrivalMinutes = journey.arrivalTimeB.substring(
      journey.arrivalTimeB.indexOf(":") + 1
    );
    if (departureHours > 23) {
      departureHours = departureHours - 24;
      if (departureHours < 10) {
        departureHours = "0" + departureHours;
      }
      journey.departureTimeA = departureHours + ":" + departureMinutes;
    }
    if (arrivalHours > 23) {
      arrivalHours = arrivalHours - 24;
      if (arrivalHours < 10) {
        arrivalHours = "0" + arrivalHours;
      }
      journey.arrivalTimeB = arrivalHours + ":" + arrivalMinutes;
    }
    return journey;
  }

  function sortTime(a, b) {
    let timeA = a.departureTimeA;
    let timeB = b.departureTimeA;
    if (timeA < timeB) {
      return -1;
    }
    if (timeA > timeB) {
      return 1;
    }
    return 0;
  }

  function filterAvailableJourneys(journey) {
    let today = new Date();
    let hours = today.getHours();
    hours = hours < 10 ? "0" + hours : hours;
    let minutes = today.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let currentTime = hours + ":" + minutes;
    if (
      today.toLocaleDateString("sv-SE") ===
      new Date(s.ticket.date).toLocaleDateString("sv-SE")
    ) {
      if (journey.departureTimeA > currentTime) {
        return journey;
      } else {
        return;
      }
    } else {
      return journey;
    }
  }

  return (
    <>
      {!!l.weekday &&
        l.journeys
          .filter(journey => checkTime(journey))
          .filter(journey => filterAvailableJourneys(journey))
          .sort(sortTime)
          .map((journey, index) => (
            <Journey
              key={index}
              {...{
                journey
              }}
            />
          ))}
      {!l.weekday &&
        l.journeys
          .filter(journey => journey.justOnWeekdays === 0)
          .filter(journey => checkTime(journey))
          .filter(journey => filterAvailableJourneys(journey))
          .sort(sortTime)
          .map((journey, index) => (
            <Journey
              key={index}
              {...{
                journey
              }}
            />
          ))}
    </>
  );
}
export default JourneyList;
