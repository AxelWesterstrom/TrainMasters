import ClassSelector from "../components/ClassSelector";
import Header from "../components/Header";
import SeatsSelector from "../components/SeatsSelector";
import styles from "../../public/css/customizeTrip.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CustomizeTrip() {
  const navigate = useNavigate();
  // const { state } = useLocation();
  // const { train } = state;

  let train = {
    date: "2022-10-20",
    time: "17:00",
    depature: "Malmö C",
    arrival: "Göteborg C",
    routeId: 2,
  };

  const [data, setData] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetch(
  //       `/api/journeysWithRoutesWithStationsAndCarriagesWithSeats/?routeId=${train.routeId}`
  //     ).then((res) => {
  //       if (res.ok) {
  //         setData(res.json());
  //       }
  //     });
  //   };
  //   fetchData();
  // }, []);

  const handleClick = () => {
    navigate("/valj-tag");
  };

  return (
    <>
      <Header />
      <div className="body">
        <div>
          <img
            src="../images/arrow-left.svg"
            className="mt-2 ms-3 back-button"
          />
        </div>
        <Container className="p-2">
          <Container className="train-info-container p-5">
            <Container className="m-3">
              <p className="custom-label">
                {train.depature} - {train.arrival}
              </p>
              <p className="custom-label">{train.date}</p>
              <p className="custom-label">{train.time}</p>
              <Button className="custom-button" onClick={handleClick}>
                Ändra
              </Button>
            </Container>
          </Container>
        </Container>
        <ClassSelector />
        <SeatsSelector />
      </div>
    </>
  );
}

export default CustomizeTrip;
