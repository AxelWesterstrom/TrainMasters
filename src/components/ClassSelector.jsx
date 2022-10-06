import { useState } from "react";
import { Container, Form } from "react-bootstrap";

function ClassSelector() {
  const [firstClass, setFirstClass] = useState("");
  const [secondClass, setSecondClass] = useState("");

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
                      label="1 Klass"
                      name="group1"
                      type={type}
                      onChange={(e) => setFirstClass(e.target.value)}
                      id={`${type}-firstClass`}
                    />
                    <Form.Check
                      label="2 Klass"
                      name="group1"
                      type={type}
                      onChange={(e) => setSecondClass(e.target.value)}
                      id={`${type}-secondClass`}
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

export default ClassSelector;
