const db = require("../DatabaseQuerry");

async function seedTrainSets() {
  await db.query("SET foreign_key_checks = 0;");

  await db.query("DELETE FROM locomotives");
  await db.query("DELETE FROM trainSets");
  await db.query("DELETE FROM carriages");
  await db.query("DELETE FROM seats");
  await db.query("ALTER TABLE locomotives AUTO_INCREMENT = 1");
  await db.query("ALTER TABLE trainSets AUTO_INCREMENT = 1");
  await db.query("ALTER TABLE carriages AUTO_INCREMENT = 1");
  await db.query("ALTER TABLE seats AUTO_INCREMENT = 1");

  let types = { 1: 54, 2: 74, 3: 28, 4: 42 };
  let handicap = {
    1: [46, 49, 52],
    2: [3, 4, 71, 72],
    3: [3, 4],
    4: [41, 42]
  };
  let seatsFacingRight = {
    1: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 50, 51
    ],
    2: [
      1, 2, 3, 4, 7, 8, 9, 10, 17, 18, 21, 22, 25, 26, 29, 30, 33, 34, 37, 38,
      41, 42, 45, 46, 49, 50, 53, 54, 57, 58, 61, 62, 65, 66, 69, 70
    ],
    3: [1, 2, 3, 4, 5, 6, 9, 10],
    4: [42, 3, 4, 9, 10, 11, 12, 15, 16, 19, 20, 23, 24, 27, 28, 29, 30, 33, 34]
  };
  let trains = [
    [1, 2, 3, 2, 2, 4],
    [1, 2, 3, 2, 4],
    [1, 2, 2, 4]
  ];
  let counter = 1;
  for (let train of trains) {
    let { insertId: locomotiveId } = await db.query(
      "INSERT INTO locomotives(locomotiveNumber) VALUES(?)",
      [counter]
    );
    let { insertId: trainSetId } = await db.query(
      "INSERT INTO trainSets(locomotiveId) VALUES(?)",
      [locomotiveId]
    );
    let carriageNumber = 1;
    for (let carriageType of train) {
      let numberOfSeats = types[carriageType];
      let { insertId: carriageId } = await db.query(
        "INSERT INTO carriages(trainSetId, number, petsAllowed, firstClass, bistro) VALUES(?,?,?,?,?)",
        [
          trainSetId,
          carriageNumber,
          carriageType === 4 ? 1 : 0,
          carriageType === 1 ? 1 : 0,
          carriageType === 3 ? 1 : 0
        ]
      );
      for (let seatNumber = 1; seatNumber <= numberOfSeats; seatNumber++) {
        await db.query(

          "INSERT INTO seats(carriageId, seatNumber, isHandicapSeat, isFacingRight) VALUES(?,?,?,?)",

          [
            carriageId,
            seatNumber,
            handicap[carriageType].includes(seatNumber) ? 1 : 0,
            seatsFacingRight[carriageType].includes(seatNumber) ? 1 : 0
          ]
        );
      }
      carriageNumber++;
    }
    counter++;
  }
  await db.query("SET foreign_key_checks = 1;");
  console.log("Trainsets populated!");
}
seedTrainSets();
