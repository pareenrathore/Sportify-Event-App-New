import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import logo from "./Sportify.png";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

const Navbar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("uname");
    localStorage.removeItem("uemail");
    navigate("/");
    props.showAlert("Logged out successfully.", "success");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              noWrap
              to="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
              component={Link}
            >
              <img
                src={logo}
                style={{ width: "180px", height: "70px" }}
                alt=""
              />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link
                    to="/"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Home
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link
                    to="/events"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Events
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link
                    to="/aboutus"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    About US
                  </Link>
                </MenuItem>
                {localStorage.getItem("token") ? (
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link
                      to="/eventcreation"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Event Creation
                    </Link>
                  </MenuItem>
                ) : null}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                  Home
                </Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link
                  to="/events"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Events
                </Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link
                  to="/aboutus"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  About US
                </Link>
              </Button>
              {localStorage.getItem("token") ? (
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link
                    to="/eventcreation"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Event Creation
                  </Link>
                </Button>
              ) : null}
            </Box>
            <Typography
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
              to="/"
              component={Link}
            >
              <img
                src={logo}
                style={{ width: "180px", height: "70px" }}
                alt=""
              />
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {!localStorage.getItem("token") ? (
                  <>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link
                        to="/login"
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Login
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link
                        to="/signup"
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Sign Up
                      </Link>
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link
                      to="/"
                      onClick={handleLogout}
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Logout
                    </Link>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
