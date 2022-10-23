function CarriageSelector({
  carriagesLayout,
  activeCarriage,
  setActiveCarriage,
  carriageRefs,
  bistroCarriage,
}) {
  const handleSelectCarriage = (idx) => () => {
    const next = carriageRefs.current[idx];
    next.scrollIntoView();
    setActiveCarriage(idx);
  };

  const renderTrainLayout = () => {
    return carriagesLayout.map((x, index) => {
      return (
        <div key={"carriage" + x}>
          {index === 0 && (
            <div
              style={{ display: "inline-block" }}
              onClick={handleSelectCarriage(index)}
              className="carriage-indicator"
              key={index}
            >
              <p className="ms-5 custom-text text-center" key={index + "text"}>
                Vagn: {x}
              </p>
              <img
                key={index + "img"}
                src="../images/locomotive.svg"
                style={
                  activeCarriage === index
                    ? {
                        width: "400px",
                        height: "51px",
                        filter: "saturate(7)",
                      }
                    : { width: "400px", height: "51px" }
                }
              />
            </div>
          )}
          {index !== carriagesLayout.length - 1 &&
            index !== 0 &&
            x !== bistroCarriage && (
              <div
                key={index}
                style={{ display: "inline-block" }}
                onClick={handleSelectCarriage(index)}
                className="carriage-indicator"
              >
                <p className="ms-5 custom-text" key={index + "text"}>
                  Vagn: {x}
                </p>
                <img
                  key={index + "img"}
                  src="../images/carriage.svg"
                  style={
                    activeCarriage === index
                      ? {
                          width: "190px",
                          height: "51px",
                          filter: "saturate(7)",
                        }
                      : { width: "190px", height: "51px" }
                  }
                />
              </div>
            )}
          {index !== carriagesLayout.length - 1 &&
            index !== 0 &&
            x === bistroCarriage && (
              <div
                key={index}
                style={{ display: "inline-block" }}
                onClick={handleSelectCarriage(index)}
                className="carriage-indicator"
              >
                <p className="ms-5 custom-text" key={index + "text"}>
                  Vagn: {x}
                  <img
                    src="../images/knife-and-fork.svg"
                    style={{ width: "30px", marginLeft: "5px" }}
                  ></img>
                </p>
                <img
                  key={index + "img"}
                  src="../images/bistro.svg"
                  style={
                    activeCarriage === index
                      ? {
                          width: "190px",
                          height: "51px",
                          filter: "saturate(7)",
                        }
                      : { width: "190px", height: "51px" }
                  }
                />
              </div>
            )}
          {index === carriagesLayout.length - 1 && (
            <div
              key={index}
              style={{ display: "inline-block" }}
              onClick={handleSelectCarriage(index)}
              className="carriage-indicator"
            >
              <p className="ms-5 custom-text" key={index + "text"}>
                Vagn: {x}
                <img
                  src="../images/dog.svg"
                  style={{ width: "30px", marginLeft: "5px" }}
                ></img>
              </p>
              <img
                key={index + "img"}
                src="../images/maneuvering.svg"
                style={
                  activeCarriage === index
                    ? {
                        width: "215px",
                        height: "51px",
                        filter: "saturate(7)",
                      }
                    : { width: "215px", height: "51px" }
                }
              />
            </div>
          )}
        </div>
      );
    });
  };
  return <>{renderTrainLayout()}</>;
}
export default CarriageSelector;