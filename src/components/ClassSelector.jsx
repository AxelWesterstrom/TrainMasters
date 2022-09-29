import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useFormAction } from "react-router-dom";

function ClassSelector() {
  const [firstClass, setFirstClass] = useState("");
  const [secondClass, setSecondClass] = useState("");

  return (
    <>
      <div>
        <Container className="p-2">
          <Container className="class-selector-container p-5">
            <Container className="m-3">
              <Form id="form">
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    name="firstClass"
                    label="1 Klass"
                    value={firstClass}
                  />

                  <Form.Check
                    type="checkbox"
                    name="secondClass"
                    value={secondClass}
                    label="2 Klass"
                  />
                </Form.Group>
              </Form>
            </Container>
          </Container>
        </Container>
      </div>
    </>
  );
}

export default ClassSelector;
