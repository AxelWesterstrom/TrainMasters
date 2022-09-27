import { useState } from "react";
import { Form } from "react-bootstrap";

function AutoSuggest({ stations, setUserInput }) {
  const [isFocus, setFocus] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [suggest, setSuggest] = useState([]);

  const handleChange = (e) => {
    let searchValue = e.target.value;
    let suggestion = [];
    if (searchValue.length > 0) {
      suggestion = stations
        .sort()
        .filter(
          (e) =>
            e.charAt(0).toLowerCase() === searchValue.charAt(0).toLowerCase()
        );
    }
    setSuggest(suggestion);
    setInputValue(searchValue);
    setUserInput(searchValue);
  };

  const suggestedStation = (value) => {
    setInputValue(value);
    setUserInput(value);
  };

  return (
    <>
      <Form.Control
        type="text"
        className="customInput"
        value={inputValue}
        onFocus={() => setFocus(true)}
        onChange={handleChange}
      />

      {isFocus && inputValue.length !== 0 && (
        <div className="customSuggestContainer mt-1">
          {suggest.map((item, index) => {
            return (
              <div className="customSuggestionList" key={index}>
                <div
                  onClick={() => {
                    suggestedStation(item);
                    setFocus(false);
                  }}
                >
                  {item}
                  {index !== suggest.length - 1 && <hr />}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default AutoSuggest;
