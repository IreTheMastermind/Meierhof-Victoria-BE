const mongoose = require("mongoose");

const reservationModel = mongoose.Schema(
  {
    date: {
      type: String,
      require: true,
    },
    time: {
      type: String,
      require: true,
    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: Number,
      require: true,
    },
    people: {
      type: Number,
      require: true,
    },
    company: {
      type: String,
    },
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationModel);

module.exports = Reservation;
