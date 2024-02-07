const express = require("express");
const port = 5000;
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());

const MONGO_URI = "mongodb://localhost:27017/Sportify";
const JWT_SECRET = "KanthedBaba";

mongoose.connect(MONGO_URI);

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("user", UserSchema);

const EventSchema = new mongoose.Schema({
  eventName: String,
  eventLocation: String,
  eventDate: Date,
  eventDescription: String,
});

const Event = mongoose.model("Event", EventSchema);

// Event Endpoints
app.get("/get/events", async (req, res) => {
  // Return a list of all events
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error(err.message); // 'message' should be lowercase
    res.status(500).send("Internal server error.");
  }
});

app.post("/newevent", async (req, res) => {
  let success = false;
  // Create a new event
  try {
    const { eventName, eventDate, eventDescription, eventLocation } = req.body;
    if (!eventName || !eventDescription) {
      return res.status(400).json({
        error: "Title and description are required for creating an event.",
      });
    }
    const event = new Event({
      eventName,
      eventDescription,
      eventDate,
      eventLocation,
    });
    const savedEvent = await event.save();
    success = true;
    res.json({ success, savedEvent });
  } catch (err) {
    console.error(err.Message);
    res.status(500).send("Internal server error.");
  }
});

app.post("/createuser", async (req, res) => {
  let success = false;

  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({
        success,
        error: "Sorry a user with this email already exists.",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPassword,
    });

    const data = {
      user: { id: user.id },
    };
    const authToken = jwt.sign(data, JWT_SECRET);

    success = true;
    const uname = user.name;
    const uemail = user.email;
    res.json({ success, authToken, uname, uemail });
  } catch (err) {
    console.error(err.Message);
    res.status(500).send("Some error occured.");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Please try to login with correct credentials." });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      const success = false;
      return res.status(400).json({
        success,
        error: "Please try to login with correct credentials.",
      });
    }

    const data = {
      user: { id: user.id },
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    const success = true;
    const uname = user.name;
    const uemail = user.email;
    res.json({ success, authToken, uname, uemail });
  } catch (err) {
    console.error(err.Message);
    res.status(500).send("Internal server error.");
  }
});

//deleting event by id
app.delete("/delete/event/:eventId", async (req, res) => {
  try {
    let event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).send("Not Found");
    }
    event = await Event.findByIdAndDelete(req.params.eventId);
    res.json({ success: "Event has been deleted", event: event });
  } catch (err) {
    console.error(err.Message);
    res.status(500).send("Internal server error.");
  }
});

// Update or edit an event
app.put("/update/event/:id", async (req, res) => {
  const { eventName, eventDescription, eventDate, eventLocation } = req.body;
  try {
    const newEvent = {};
    if (eventName) {
      newEvent.eventName = eventName;
    }
    if (eventDescription) {
      newEvent.eventDescription = eventDescription;
    }
    if (eventDate) {
      newEvent.eventDate = eventDate;
    }
    if (eventLocation) {
      newEvent.eventLocation = eventLocation;
    }

    let event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send("Not Found");
    }
    event = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: newEvent },
      { new: true }
    );
    res.json(event);
  } catch (err) {
    console.error(err.Message);
    res.status(500).send("Internal server error.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at https://localhost:${port}`);
});
