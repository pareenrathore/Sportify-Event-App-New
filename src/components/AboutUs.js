import React from "react";
import "./AboutUs.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import card1 from "./card1.png";
import card2 from "./card2.png";
import card3 from "./card3.png";

const AboutUs = () => {
  return (
    <div class="cards">
      <Card sx={{ maxWidth: 345 }} className="card">
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={card1}
            alt=""
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Outdoor Events
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We specialize in creating outdoor events that are tailored to your
              unique needs and preferences. Our team of skilled professionals
              will work with you to design, plan, and execute your event,
              ensuring that every detail is taken care of, from venue selection
              to catering, entertainment, and more. Whether you’re looking to
              host a corporate retreat, team-building event, or a family
              gathering, we have the expertise and experience to make it happen.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ maxWidth: 345 }} className="card">
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={card2}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Sports Gatherings
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We specialize in organizing sports gatherings that bring together
              sports enthusiasts of all levels. Our events are designed to be
              inclusive and fun, with a focus on fostering a sense of community
              and camaraderie. From casual pick-up games to competitive
              tournaments, we offer a wide range of sports activities that cater
              to your interests and skill level. Our team of experienced
              organizers will ensure that your sports gathering runs smoothly,
              from registration to equipment rental and on-field management.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card sx={{ maxWidth: 345 }} className="card">
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={card3}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Event Production
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We specialize in event production, offering end-to-end services
              that encompass everything from concept development to execution.
              Our team of creative professionals will work with you to develop a
              unique and innovative event concept that aligns with your goals
              and objectives. We have the resources and expertise to handle all
              aspects of event production, from logistics and operations to
              marketing and promotion. Our focus is on delivering a seamless and
              hassle-free event experience, leaving you free to focus on your
              guests and enjoy the event.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default AboutUs;
