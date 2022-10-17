const path = require("path");
const express = require("express");
const RestApi = require("./RestApi");
const Mailer = require("./Mailer");

module.exports = class Server {
  app = express();
  port = 4000;

  constructor() {
    this.start();
  }

  start() {
    this.app.use(express.json());
    this.message = `Backend listening on port ${this.port}`;
    new RestApi(this.app);
    new Mailer(this.app);
    this.app.listen(this.port, () => console.log(this.message));
  }
};
