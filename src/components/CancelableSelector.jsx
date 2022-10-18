import { useEffect } from "react";
import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useStates } from "../assets/helpers/states";

function CancelableSelector() {
  let s = useStates("booking");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (s.ticket.carriageClass == 1) {
      setPrice(s.ticket.firstClassPrice);
    }
    if (s.ticket.carriageClass == 2) {
      setPrice(s.ticket.secondClassPrice);
    }
  }, [s.ticket.carriageClass]);

  const handleSelectFlexible = (e) => {
    let value = e.target.id;
    if (value === "cancelable") {
      s.ticket.type = "cancelable";
      s.ticket.totalPrice = Math.round(price * 1.2);
    }
    if (value === "notCancelable") {
      s.ticket.type = "not-cancelable";
      s.ticket.totalPrice = price;
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
                      label={
                        s.ticket.carriageClass !== 0
                          ? `Kan återbetalas ${Math.round(price * 1.2)} kr`
                          : "Kan återbetalas"
                      }
                      name="group1"
                      type={type}
                      onChange={(e) => handleSelectFlexible(e)}
                      id="cancelable"
                      style={
                        s.ticket.carriageClass !== 0
                          ? {}
                          : { opacity: "0.68", pointerEvents: "none" }
                      }
                      value={"cancelable"}
                      checked={s.ticket.type === "cancelable"}
                    />

                    <Form.Check
                      key={"2"}
                      label={
                        s.ticket.carriageClass !== 0
                          ? `Kan ej återbetalas / ombokas ${price} kr`
                          : "Kan ej återbetalas / ombokas"
                      }
                      name="group1"
                      type={type}
                      onChange={(e) => handleSelectFlexible(e)}
                      id="notCancelable"
                      style={
                        s.ticket.carriageClass !== 0
                          ? {}
                          : { opacity: "0.68", pointerEvents: "none" }
                      }
                      value={"notCancelable"}
                      checked={s.ticket.type === "not-cancelable"}
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
