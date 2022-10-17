import Header from "../components/Header";
import React from "react";
import SearchBar from "../components/SearchBar";
import styles from "../../public/css/home.css";
import { react, useState, useEffect } from "react";
import { useStates } from "../assets/helpers/states";
import { useNavigate } from "react-router-dom";

function Home() {
  const [stations, setStations] = useState([]);
  let s = useStates("booking");

  useEffect(() => {
    const fetchData = async () => {
      await fetch("/api/stations") //Fetch station table from database
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((jsonRes) => {
          setStations(jsonRes);
        });
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
