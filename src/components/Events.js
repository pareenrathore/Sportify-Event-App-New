import React, { useState } from "react";
import "./Events.css";
import Typography from "@mui/material/Typography";
import EventItem from "./EventItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const Events = (props) => {
  const eventsInitial = [];
  const [events, setEvents] = useState(eventsInitial);

  const host = "http://localhost:5000";

  //Get all note
  const getEvents = async () => {
    // API Call
    const response = await fetch(`${host}/get/events`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setEvents(json);
  };

  getEvents();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  //Edit event
  const editEvent = async (
    id,
    eventName,
    eventDescription,
    eventDate,
    eventLocation
  ) => {
    const response = await fetch(`${host}/update/event/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        eventName,
        eventDescription,
        eventDate,
        eventLocation,
      }),
    });

    const json = await response.json();
    console.log(json);
    let newEvents = JSON.parse(JSON.stringify(events));
    for (let index = 0; index < newEvents.length; index++) {
      const element = newEvents[index];
      if (element._id === id) {
        newEvents[index].eventName = eventName;
        newEvents[index].eventDescription = eventDescription;
        newEvents[index].eventDate = eventDate;
        newEvents[index].eventLocation = eventLocation;
        break;
      }
    }
    setEvents(newEvents);
  };

  const [event, setEvent] = useState({
    id: "",
    eeventName: "",
    eeventDescription: "",
    eeventDate: "",
    eeventLocation: "",
  });

  const onChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const [open, setOpen] = useState(false);
  const updateEvent = (currentEvent) => {
    setOpen(true);
    setEvent({
      id: currentEvent._id,
      eeventName: currentEvent.eventName,
      eeventDescription: currentEvent.eventDescription,
      eeventDate: currentEvent.eventDate,
      eeventLocation: currentEvent.eventLocation,
    });
  };
  const close = () => setOpen(false);

  const handleClick = (e) => {
    editEvent(
      event.id,
      event.eeventName,
      event.eeventDescription,
      event.eeventDate,
      event.eeventLocation
    );
    setOpen(false);
    e.preventDefault();
    props.showAlert("Event updated successfully.", "success");
  };

  return (
    <div>
      <Modal open={open} onClose={close} closeAfterTransition>
        <Box sx={style}>
          <form action="">
            <TextField
              onChange={onChange}
              value={event.eeventName}
              name="eeventName"
              label="Event Name"
              variant="outlined"
              fullWidth
              margin="normal"
              required={true}
            />
            <TextField
              onChange={onChange}
              value={event.eeventDescription}
              name="eeventDescription"
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              required={true}
            />
            <TextField
              onChange={onChange}
              value={event.eeventDate.slice(0, 10)}
              name="eeventDate"
              label="Date"
              variant="outlined"
              fullWidth
              type="date"
              margin="normal"
            />
            <TextField
              onChange={onChange}
              value={event.eeventLocation}
              name="eeventLocation"
              label="Location"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Button
              disabled={
                event.eeventName.length < 5 ||
                event.eeventDescription.length < 5
              }
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleClick}
            >
              Save
            </Button>
          </form>
        </Box>
      </Modal>
      {events.length === 0 ? (
        <Typography variant="h5" component="div">
          Start adding events right away
        </Typography>
      ) : (
        <Typography variant="h5" component="div">
          Listed Events
        </Typography>
      )}
      <div className="notes-cards-column">
        <div className="container">
          <div className="notes-cards-column">
            {events.map((event) => {
              return (
                <EventItem
                  key={event._id}
                  updateEvent={updateEvent}
                  showAlert={props.showAlert}
                  event={event}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
