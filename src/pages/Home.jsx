import Header from "../components/Header";
import React from "react";
import SearchBar from "../components/SearchBar";
import styles from "../../public/css/home.css";

function Home() {
  return (
    <>
      <div className="home">
        <div className="header">
          <Header />
        </div>
        <div className="main">
          <SearchBar />
        </div>
      </div>
    </>
  );
}
export default Home;
