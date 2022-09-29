import Header from "../components/Header";
import React from "react";
import SearchBar from "../components/SearchBar";
import styles from "../../public/css/home.css";
import { react, useState, useEffect } from "react";

function Home() {
  const [stations, setStations] = useState([]);
  let allStations = [];

  useEffect(() => {
    const fetchData = async () => {
      await fetch("/api/stations") //Fetch station table from database
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((jsonRes) => {
          jsonRes.map((station) => {
            if (!allStations.includes(station.name)) {
              //Delete the duplicate stations
              allStations.push(station.name);
            }
          });
        })
        .then(setStations(allStations));
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="home">
        <div className="header">
          <Header />
        </div>
        <div className="main">
          <SearchBar stations={stations} />
        </div>
      </div>
    </>
  );
}
export default Home;
