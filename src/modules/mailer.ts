import path from "path";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";

const { host, port, user, password } = require("../config/mail.json");

const transport = nodemailer.createTransport({
  host,
  port,
  auth: { user, password },
});

transport.use(
  "compile",
  hbs({
    viewEngine: {
      layoutsDir: path.resolve("./src/resources/mail/"),
      extname: ".html",
    },
    viewPath: path.resolve("./src/resources/mail/"),
    extName: ".html",
  })
);

module.exports = transport;
