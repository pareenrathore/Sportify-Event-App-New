import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Update = (props) => {
  let navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const eventName = data.get("eventName");
    const eventDate = data.get("eventDate");
    const eventLocation = data.get("eventLocation");
    const eventDescription = data.get("eventDescription");

    const response = await fetch(`http://localhost:5000/newevent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventName,
        eventDate,
        eventLocation,
        eventDescription,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      // localStorage.setItem("token", json.authToken);
      navigate("/events");
      props.showAlert("Event created successfully", "success");
    } else {
      props.showAlert("There might be some problem", "error");
    }
  };
  const defaultTheme = createTheme();
  return (
    <div className="container">
      <h1>Update Event</h1>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Event Name"
              name="eventName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="eventDate"
              type="date"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Location"
              name="eventLocation"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Descrption"
              name="eventDescription"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Event
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Update;
