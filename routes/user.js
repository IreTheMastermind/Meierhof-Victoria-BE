const express = require("express");
const Reservation = require("../models/Reservation");
const router = express.Router();
const sendMail = require("../mail/config");

router.get("/", (_, res) => {
  res.send("WELCOME TO MEIERHOF");
});

router.post("/availability", async (req, res) => {
  const { time, date } = req.body;

  try {
    let reservation = await Reservation.findOne({ time, date });

    if (reservation) {
      return res.send({ msg: "Reservation Exists" });
    }

    res.send({ msg: "Success" });
  } catch (error) {}
});

const processData = async (req, res, next) => {
  const { email, firstName, lastName, phone, date, time } = req.body;

  try {
    // Extract your data here
    // const to = " ireoluwaenoch@gmail.com"; // Add the email you want to send to ,
    const to = "info@meierhof-victoria.ch"; // Add the email you want to send to ,
    subject = "Table Reservation"; // add the subject you want to send,
    html = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <p>Hello,</p>
        <p>A new reservation has been made.</p>
          <div>
            <span><strong>First name:</strong></span>
            <span>${firstName}</span>
          </div>
          <div>
            <span><strong>Last name:</strong></span>
            <span>${lastName}</span>
          </div>
          <div>
            <span><strong>Email:</strong></span>
            <span>${email}</span>
          </div>
          <div>
            <span><strong>Phone:</strong></span>
            <span>${phone}</span>
          </div>
          <div>
            <span><strong>Date:</strong></span>
            <span>${date} ${time}</span>
          </div>
        <p>Thank you.</p>
      </div>
    </body>
  </html>
    `;

    const send = await sendMail(to, subject, html);
    // if (send) return res.send("OK");
    if (send) return "OK";
    // return res.status(400).send("Error");
  } catch (error) {
    console.log(error);
  }
};

router.post("/create", async (req, res) => {
  const { time, date } = req.body;

  try {
    let reservation = await Reservation.findOne({ time, date });

    if (reservation) {
      return res.send({ msg: "Reservation Exists" });
    }

    reservation = new Reservation({ ...req.body });

    reservation = await reservation.save();
    await processData(req);

    res.send({ reservation, msg: "Success" });
  } catch (error) {}
});

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getCurrentWeekDates() {
  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay();
  const currentWeekDates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + i);
    currentWeekDates.push(date);
  }
  return currentWeekDates;
}

const getDate = (date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

router.get("/week", async (req, res) => {
  const dates = getCurrentWeekDates().map((item) => {
    return getDate(item);
  });

  try {
    let reservations = await Reservation.find({
      date: { $in: dates },
    });
    res.send(reservations);
  } catch (error) {}
});

module.exports = router;
