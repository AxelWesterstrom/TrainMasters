const data = require("./data/routesJson.json");
const db = require("../DatabaseQuerry");

async function routeSeed() {
  db.connect();
  await db.query("SET foreign_key_checks = 0;");

  await db.query("DELETE FROM routes");
  await db.query("DELETE FROM stations");
  await db.query("ALTER TABLE routes AUTO_INCREMENT = 1");
  await db.query("ALTER TABLE stations AUTO_INCREMENT = 1");
  let trainset = 1;
  let counter = 0;
  for (let routeName of Object.keys(data)) {
    console.log(routeName, trainset);
    let result = await db.query(
      "INSERT INTO routes(trainset, name) VALUES (?,?)",
      [trainset, routeName]
    );
    let routeId = result.insertId;

    for (let { station, arrival, departure, platform } of data[routeName]) {
      await db.query(
        "INSERT INTO stations(route, name, arrivalOffset, departureOffset, platform) VALUES (?,?,?,?,?)",
        [routeId, station, arrival, departure, platform]
      );
    }
    counter++;
    trainset += counter % 2 == 0;
  }
  await db.query("SET foreign_key_checks = 0;");
  console.log("Done seeding routes");
}
routeSeed();
//route , name, arrivalOffset, departureOffset, platform
