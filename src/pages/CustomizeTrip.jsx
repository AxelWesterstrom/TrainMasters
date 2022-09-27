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

  const goToNextPage = () => {
    navigate("/kassan");
  };

  const goToChooseSeats = () => {
    navigate("/valj-plats");
  };

  return (
    <>
      <Header />
      <div className="body">
        <div onClick={handleClick}>
          <img
            src="../images/arrow-left.svg"
            className="mt-2 ms-3 back-button"
          />
        </div>
        <Container>
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
          <Container className="p-2">
            <Container className="seat-selector-container p-5">
              <p className="custom-label m-4" onClick={goToChooseSeats}>
                Välj plats
              </p>
            </Container>
          </Container>
        </Container>

        <Container className="d-flex justify-content-end  info">
          <Button className="custom-button mt-3 mb-5" onClick={goToNextPage}>
            Fortsätt
          </Button>
        </Container>
      </div>
    </>
  );
}

export default CustomizeTrip;
