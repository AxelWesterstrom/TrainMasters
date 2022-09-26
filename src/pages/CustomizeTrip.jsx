import ClassSelector from "../components/ClassSelector";
import Header from "../components/Header";
import SeatsSelector from "../components/SeatsSelector";
import styles from "../../public/css/customizeTrip.css";
import { useLocation } from "react-router-dom";

function CustomizeTrip() {
  // const { state } = useLocation();
  // const { train } = state;

  return (
    <>
      <Header />
      <div>
        <img
          src="arrow-left.svg"
          width={40}
          className="mt-2 ms-3 back-button"
        />
      </div>
      <div></div>
      <ClassSelector />
      <SeatsSelector />
    </>
  );
}

export default CustomizeTrip;
