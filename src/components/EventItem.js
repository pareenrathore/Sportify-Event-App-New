import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

const EventItem = (props) => {
  const { event, updateEvent } = props;
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const eventsInitial = [];

  const [events, setEvents] = useState(eventsInitial);

  const host = "http://localhost:5000";
  //Delete Note
  const deleteEvent = async (id) => {
    //Todo: API Call
    const response = await fetch(`${host}/delete/event/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    const newEvent = events.filter((event) => {
      return event._id !== id;
    });
    setEvents(newEvent);
  };

  return (
    <div className="col-md-4">
      <ThemeProvider theme={darkTheme}>
        <Box sx={{ minWidth: 275 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {event.eventName}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Location: {event.eventLocation}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Date: {event.eventDate.slice(0, 10)}
              </Typography>
              <Typography variant="body2">{event.eventDescription}</Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => {
                  deleteEvent(event._id);
                  props.showAlert("Event deleted successfully.", "success");
                }}
              >
                Delete
              </Button>
              {!localStorage.getItem("token") ? null : (
                <Button
                  size="small"
                  onClick={() => {
                    updateEvent(event);
                  }}
                >
                  Edit
                </Button>
              )}
            </CardActions>
          </Card>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default EventItem;
