const data = require("./data/timetable.json");
const db = require("../DatabaseQuerry");

async function seedJourneys() {
  db.connect();

  await db.query("SET foreign_key_checks = 0;");
  await db.query("DELETE FROM journeys");
  await db.query("ALTER TABLE journeys AUTO_INCREMENT = 1");

  for (let name of Object.keys(data)) {
    let route = await db.query("SELECT id FROM routes WHERE name = ?", [name]);
    let routeId = route[0].id;
    for (let { time, justOnWeekdays } of data[name]) {
      console.log(routeId, time, justOnWeekdays);
      await db.query(
        "INSERT INTO journeys(routeId, startTime, justOnWeekdays) VALUES (?,?, ?)",
        [routeId, time, justOnWeekdays]
      );
    }
  }
  await db.query("SET foreign_key_checks = 1;");
  console.log("Journeys populated");
}
seedJourneys();

