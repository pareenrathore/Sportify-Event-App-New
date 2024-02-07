import React from "react";
import "./home.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const Home = () => {
  return (
    <div className="card">
      {localStorage.getItem("uname") ? (
        <h1>Welcome, {localStorage.getItem("uname")}</h1>
      ) : null}
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              SPORTIFY EVENTS
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Welcome to Sportify, the premier event production company for
              outdoor sports enthusiasts. We specialize in creating
              unforgettable experiences for individuals and groups who share a
              passion for sports and adventure. Our team of seasoned
              professionals has years of experience in event planning,
              production, and execution. We work tirelessly to ensure that every
              event we produce meets and exceeds our clients’ expectations. At
              Sportify, we’re dedicated to providing seamless event planning and
              execution, so all you have to do is show up and enjoy the
              experience. So why wait? Join the Sportify community and
              experience the great outdoors like never before.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default Home;
