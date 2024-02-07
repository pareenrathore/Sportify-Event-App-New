// Footer.js
import React from "react";
import "./footer.css";
import logo from "./Sportify.png";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const Footer = () => {
  let year = new Date();
  return (
    <footer className="footer">
      <p>
        &copy; {year.getFullYear()}{" "}
        <Typography component={Link} to="/">
          <img alt="" src={logo} style={{ width: "100px" }} />
        </Typography>
        All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
