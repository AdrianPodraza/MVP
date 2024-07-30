require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User");
const AppointmentModel = require("./models/Appointment");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendSms } = require("./services/twilioService");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/Users");

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader)
    return res.status(403).send({ message: "No token provided." });

  const token = bearerHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(500).send({ message: "Failed to authenticate token." });

    req.userId = decoded.userID;
    req.email = decoded.email;
    req.phoneNumber = decoded.phoneNumber;

    next();
  });
};

app.post("/register", async (req, res) => {
  const { email, phoneNumber, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (existingUser) {
      return res.status(409).send({
        message: "User with this email or phone number already exists.",
      });
    }

    // Haszowanie hasła
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      ...req.body,
      password: hashedPassword,
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error checking user existence." });
  }
});

app.listen(3001, () => {
  console.log("server is runing");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({
    $or: [{ email }, { phoneNumber: email }],
  });

  if (!user) {
    return res.status(404).json("no user");
  }

  // Weryfikacja hasła
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json("the password is incorrect");
  }

  const token = jwt.sign(
    {
      userID: user._id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      admin: user.admin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Success",
    token,
    userData: {
      email: user.email,
      phoneNumber: user.phoneNumber,
      admin: user.admin,
    },
  });
});

app.post("/book-appointment", verifyToken, (req, res) => {
  const { date, time } = req.body;
  const userId = req.userId;

  UserModel.findById(userId)
    .then((user) => {
      if (!user) return res.status(404).send({ message: "User not found." });

      const { email, phoneNumber } = user;
      AppointmentModel.findOne({ $or: [{ email }, { phoneNumber }] }).then(
        (existingAppointment) => {
          if (existingAppointment) {
            return res
              .status(500)
              .send({ message: "Appointment already made" });
          }
          AppointmentModel.create({ userId, date, time, phoneNumber, email })
            .then((appointment) => res.json(appointment))
            .catch((err) => res.status(500).json(err));
        }
      );
    })
    .catch((err) => res.status(500).send({ message: "Error fetching user." }));
});

app.get("/my-appointment", verifyToken, (req, res) => {
  const email = req.email;
  const phoneNumber = req.phoneNumber;

  AppointmentModel.findOne({
    $or: [{ email }, { phoneNumber }],
    approved: true,
  })
    .then((appointment) => {
      if (!appointment) {
        return res.status(404).send({ message: "Appointment not found." });
      }
      res.json(appointment);
    })
    .catch((err) =>
      res.status(500).send({ message: "Error fetching appointment." })
    );
});
app.get("/appointments", (req, res) => {
  AppointmentModel.find({})
    .then((appointments) => {
      res.status(200).json(appointments);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error fetching appointments." });
    });
});

app.post("/approve-appointment/:id", async (req, res) => {
  const appointmentId = req.params.id;
  try {
    await AppointmentModel.findByIdAndUpdate(appointmentId, { approved: true });
    res.status(200).send("Appointment approved");
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/cancel-appointment/:id", async (req, res) => {
  const appointmentId = req.params.id;
  try {
    await AppointmentModel.findOneAndDelete({ _id: appointmentId });
    res.status(200).send("Appointment cancelled");
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/send-sms", async (req, res) => {
  const { to, message } = req.body;

  try {
    await sendSms(to, message);
    res.status(200).send("SMS sent successfully.");
  } catch (error) {
    console.error("Error sending SMS:", error);
    res.status(500).send("Failed to send SMS.");
  }
});
