import path from "path";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";

const { host, port, user, pass } = require("../config/mail.json");

const transport = nodemailer.createTransport({
  host,
  port,
  auth: {
    user,
    pass,
  },
});

transport.use(
  "compile",
  hbs({
    viewEngine: {
      layoutsDir: path.resolve("./src/resources/mail/"),
      extname: ".html",
      defaultLayout: "auth/forgot_password",
    },
    viewPath: path.resolve("./src/resources/mail/"),
    extName: ".html",
  })
);

module.exports = transport;
