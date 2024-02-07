import React, { useState } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Events from "./components/Events";
import Home from "./components/home";
import Login from "./components/Login";
import AboutUs from "./components/AboutUs";
import Create from "./components/EventCreation";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import AlertComponent from "./components/Alert";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar showAlert={showAlert} />
        <AlertComponent alert={alert} />
        <Routes>
          <Route
            exact
            path="/"
            element={<Home showAlert={showAlert} />}
          ></Route>
          <Route
            exact
            path="/login"
            element={<Login showAlert={showAlert} />}
          ></Route>
          <Route
            exact
            path="/signup"
            element={<Signup showAlert={showAlert} />}
          ></Route>
          <Route
            exact
            path="/events"
            element={<Events showAlert={showAlert} />}
          ></Route>
          <Route
            exact
            path="/aboutus"
            element={<AboutUs showAlert={showAlert} />}
          ></Route>
          {localStorage.getItem("token") ? (
            <Route
              exact
              path="/eventcreation"
              element={<Create showAlert={showAlert} />}
            ></Route>
          ) : (
            <Route
              exact
              path="/eventcreation"
              element={<Login showAlert={showAlert} />}
            ></Route>
          )}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
