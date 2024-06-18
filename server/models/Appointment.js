const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  date: String,
  time: String,
  phoneNumber: String,
  email: String,
  approved: { type: Boolean, default: false },
});

const AppointmentModel = mongoose.model("Appointment", appointmentSchema);

module.exports = AppointmentModel;
