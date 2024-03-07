const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shahidkhatriii34@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = transporter;
