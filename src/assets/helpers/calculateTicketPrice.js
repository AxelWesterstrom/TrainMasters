function calculateTicketPrice(
  arrivalOffsetArrival,
  departureOffsetDeparture,
  isFirstClass,
  occupancy,
  ticketType,
  cancelable
) {
  let totalMin = arrivalOffsetArrival - departureOffsetDeparture;
  let price = isFirstClass ? totalMin * 3 : totalMin * 2;
  let occupancyFactor = 1.5 - (1 - occupancy);
  price = price * occupancyFactor;
  let typeFactor;

  switch (ticketType) {
    case "regular":
      typeFactor = 1.0;
      break;
    case "senior":
      typeFactor = 0.9;
      break;
    case "student":
      typeFactor = 0.85;
      break;
    case "youth":
      typeFactor = 0.85;
      break;
    case "child":
      typeFactor = 0.5;
      break;
    default:
      typeFactor = 1.0;
  }
  price = price * typeFactor;
  price = cancelable ? price * 1.2 : price;
  return Math.round(price);
}

export default calculateTicketPrice;
