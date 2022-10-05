function calculateOccupancy(numberOfSeats, occupiedSeats) {
  return Math.round((occupiedSeats / numberOfSeats) * 100) / 100;
}
export default calculateOccupancy;
