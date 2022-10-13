import { useEffect } from "react";
import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useStates } from "../assets/helpers/states";

function CancelableSelector() {
  let s = useStates("booking");

  const handleSelectFlexible = (e) => {
    let value = e.target.id;
    if (value === "cancelable") {
      s.ticket.type = "cancelable";
    }
    if (value === "notCancelable") {
      s.ticket.type = "not-cancelable";
    }
  };
  return (
    <>
      <div>
        <Container className="p-2">
          <Container className="class-selector-container p-5">
            <Container className="m-3">
              <Form>
                {["radio"].map((type) => (
                  <div key={`${type}`} className="mb-3 custom-label">
                    <Form.Check
                      key={"1"}
                      label="Kan återbetalas"
                      name="group1"
                      type={type}
                      onChange={(e) => handleSelectFlexible(e)}
                      id="cancelable"
                      style={
                        s.ticket.carriageClass !== 0
                          ? {}
                          : { opacity: "0.68", pointerEvents: "none" }
                      }
                    />

                    <Form.Check
                      key={"2"}
                      label="Kan ej återbetalas / ombokas"
                      name="group1"
                      type={type}
                      onChange={(e) => handleSelectFlexible(e)}
                      id="notCancelable"
                      style={
                        s.ticket.carriageClass !== 0
                          ? {}
                          : { opacity: "0.68", pointerEvents: "none" }
                      }
                    />
                  </div>
                ))}
              </Form>
            </Container>
          </Container>
        </Container>
      </div>
    </>
  );
}

export default CancelableSelector;
