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
        <>
          {index === 0 && (
            <div
              style={{ display: "inline-block" }}
              onClick={handleSelectCarriage(index)}
              className="carriage-indicator"
            >
              <p className="ms-5 custom-text text-center">Vagn: {x}</p>
              <img
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
                style={{ display: "inline-block" }}
                onClick={handleSelectCarriage(index)}
                className="carriage-indicator"
              >
                <p className="ms-5 custom-text">Vagn: {x}</p>
                <img
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
                style={{ display: "inline-block" }}
                onClick={handleSelectCarriage(index)}
                className="carriage-indicator"
              >
                <p className="ms-5 custom-text">Vagn: {x}</p>
                <img
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
              style={{ display: "inline-block" }}
              onClick={handleSelectCarriage(index)}
              className="carriage-indicator"
            >
              <p className="ms-5 custom-text">Vagn: {x}</p>
              <img
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
        </>
      );
    });
  };
  return <>{renderTrainLayout()}</>;
}
export default CarriageSelector;
