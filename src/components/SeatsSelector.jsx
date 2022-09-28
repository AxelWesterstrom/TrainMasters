import { Container, Row, Col } from "react-bootstrap";

function SeatsSelector() {
  const seats = [
    {
      number: 1,
    },
    {
      number: 2,
    },
    {
      number: 3,
    },
    {
      number: 4,
    },
    {
      number: 5,
    },
    {
      number: 6,
    },
    {
      number: 7,
    },
    {
      number: 8,
    },
    {
      number: 9,
    },
    {
      number: 10,
    },
  ];

  const checkSeatNumber = (number) => {
    console.log(number);
  };

  const RenderSeats = () => {
    return seats.map((seat, index) => {
      return (
        <div
          key={seat.number}
          onClick={() => checkSeatNumber(seat.number)}
          className="seat"
        >
          <img
            key={seat.number}
            src="../images/seat.svg"
            style={{ width: "40px" }}
          />
        </div>
      );
    });
  };
  let changeRow = false;
  let allSeats = [];

  return (
    <>
      <Container className="carriage-container">
        {seats.map((seat, index) => {
          if ((seat.number - 1) % 3 === 0) {
            changeRow = true;
            allSeats = [];
          }

          allSeats.push(
            <div
              key={seat.number}
              onClick={() => checkSeatNumber(seat.number)}
              className="seat"
            >
              <img
                key={seat.number}
                src="../images/seat.svg"
                style={{ width: "40px" }}
              />
            </div>
          );

          return (
            <div>
              {changeRow && allSeats.length === 3 && (
                <div className="seat-row">
                  {allSeats.map((x) => {
                    return x;
                  })}
                </div>
              )}
            </div>
          );
        })}
      </Container>
    </>
  );
}

export default SeatsSelector;
