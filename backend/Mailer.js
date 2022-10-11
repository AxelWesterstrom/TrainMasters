const mailCredentials = require("./secrets/mailCredentials");
const nodemailer = require("nodemailer");

module.exports = class Mailer {
  constructor() {
    this.transporter = nodemailer.createTransport(mailCredentials);
  }

  mail(body) {
    let { email, date, chosenJourney } = body;
    let {
      stationNameA,
      stationNameB,
      departureTimeA,
      arrivalTimeB,
      trainNumber
    } = chosenJourney;
    console.log("Using MAIL");
    let options = {
      from: "tagmastarna@outlook.com",
      to: email,
      subject: "Bokningsbekräftelse",
      text: "Hi, I'm emailing from node.js AGAIN!",
      html:
        "<div style='background-color:#7aac71;border:solid 2px;border-radius:5px;border-color:#4b7c4b; padding: 5px'><div><h1>Din Bokning<h1/><h2>För resa från " +
        stationNameA +
        " till " +
        stationNameB +
        ".</h2><h3> Datum: " +
        date +
        "</h3><h3>Avgångstid: " +
        departureTimeA +
        " </h3><h3> Beräknad ankomsttid: " +
        arrivalTimeB +
        " </h3><h3>Tågnummer: " +
        trainNumber +
        "</h3></div><img style='display: inline; margin: 0 5px; title=tagmastarnaLogo src=../public/images/wheelchair.svg alt=wheelchair width=50 height=50' /></div > "
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
