import React from "react";
import { Button } from "react-bootstrap";
import "../../public/css/popup.css";

function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <Button
          className="customButton"
          onClick={() => {
            props.setTrigger(false);
          }}
        >
          Close
        </Button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
