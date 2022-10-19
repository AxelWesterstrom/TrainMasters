const mailCredentials = require("./secrets/mailCredentials");
const nodemailer = require("nodemailer");
const { dirname } = require("path");

module.exports = class Mailer {
  constructor() {
    this.transporter = nodemailer.createTransport(mailCredentials);
  }

  mail(body) {
    let { email, date, chosenJourney, totalPassengers, bookingsNumber } = body;
    let {
      stationNameA,
      stationNameB,
      departureTimeA,
      arrivalTimeB,
      trainNumber,
    } = chosenJourney;
    if (arrivalTimeB.slice(0, 2) > 24) {
      arrivalTimeB =
        "0" +
        (arrivalTimeB.slice(0, 2) - 24).toString() +
        arrivalTimeB.slice(2, 6);
    }
    if (departureTimeA.slice(0, 2) > 24) {
      departureTimeA =
        "0" +
        (departureTimeA.slice(0, 2) - 24).toString() +
        departureTimeA.slice(2, 6);
    }
    console.log("Using MAIL");
    let options = {
      from: "tagmastarna@outlook.com",
      to: email,
      subject: "Bokningsbekräftelse",
      text: "Hi, I'm emailing from node.js AGAIN!",
      html:
        '<div style="border:solid 2px;border-radius:5px;"><div><header style="background-color:#4C2C50;text-align:center"><a href="http://localhost:3000"><img src="cid:logo"></a><header/></div><div style="padding:20px;text-align:center">' +
        "<h1> Din Bokning</h1><h2> För resa från " +
        stationNameA +
        " till " +
        stationNameB +
        ".</h2><h2> Datum: " +
        date +
        "</h2><h2>Avgångstid: " +
        departureTimeA +
        " </h2><h2> Beräknad ankomsttid: " +
        arrivalTimeB +
        " </h2><h2>Tågnummer: " +
        trainNumber +
        " </h2><h2>Bokningsnummer: " +
        bookingsNumber +
        " </h2><h2>Antal resenärer: " +
        totalPassengers +
        '</h2><img/ src="cid:balloons"></div></div>',

      attachments: [
        {
          filename: "balloons.jpg",
          path: __dirname + "/imagesForEmail/balloons.jpg",
          cid: "balloons",
        },
        {
          filename: "logo.png",
          path: __dirname + "/imagesForEmail/logo.png",
          cid: "logo",
        },
      ],
    };

    this.transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Sent: " + info.response);
    });
  }
};
