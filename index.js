const express = require("express");
const { v4: uuidv4 } = require('uuid'); // Import the uuid library for generating unique IDs
const port = 8000;
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// Sample in-memory data
const events = [];
const users = [];
const registrations = [];

// Welcome Message Endpoint
app.get("/", (req, res) => {
  res.send({
    message: 'Welcome to Sportify'
  });
});


app.get('/api/users', (req, res) => {
    res.json(users);
});


// Event Endpoints
app.get('/api/events', (req, res) => {
  // Return a list of all events
  res.json(events);
});

app.post('/api/events', (req, res) => {
  // Create a new event
  const newEvent = req.body;

  if (!newEvent.title || !newEvent.description) {
    return res.status(400).json({ error: 'Title and description are required for creating an event.' });
  }

  newEvent.id = generateUniqueId();
  events.push(newEvent);

  res.status(201).json(newEvent);
});

app.get('/api/events/:eventId', (req, res) => {
  // Return details for a specific event
  const eventId = req.params.eventId;
  const event = events.find((e) => e.id === eventId);

  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ error: 'Event not found' });
  }
});

// User Endpoints
app.post('/api/users/register', (req, res) => {
  // Register a new user
  const newUser = req.body;

  if (!newUser.name || !newUser.email) {
    return res.status(400).json({ error: 'Name and email are required for registering a user.' });
  }

  newUser.id = generateUniqueId();
  users.push(newUser);

  res.status(201).json(newUser);
});

app.get('/api/users/:userId', (req, res) => {
  // Retrieve user details
  const userId = req.params.userId;
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Event Registration Endpoint
app.post('/api/events/:eventId/register', (req, res) => {
  // Register a user for a specific event
  const { userId, eventId } = req.body;

  if (!userId || !eventId) {
    return res.status(400).json({ error: 'Both userId and eventId are required for event registration.' });
  }

  const registration = { userId, eventId };
  registrations.push(registration);

  res.status(201).json(registration);
});

// Retrieve all Registrations Endpoint
app.get('/api/registrations', (req, res) => {
  res.json(registrations);
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at https://localhost:${port}`);
});

function generateUniqueId() {
  // Using the uuid library to generate a unique ID
  return uuidv4();
}

//deleting event id
app.delete('/api/events/:eventId', (req, res) => {
    const eventId = req.params.eventId;
    const index = events.findIndex((e) => e.id === eventId);
  
    if (index !== -1) {
      events.splice(index, 1);
      registrations.filter((reg) => reg.eventId !== eventId);
      res.json({ message: 'Event deleted successfully' });
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  });


  //deleting user by id
  app.delete('/api/users/:userId', (req, res) => {
    const userId = req.params.userId;
    const index = users.findIndex((u) => u.id === userId);
  
    if (index !== -1) {
      users.splice(index, 1);
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });