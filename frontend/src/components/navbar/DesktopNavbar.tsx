import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../login/LoginManager";
import "./DesktopNavbar.scss";

export const DesktopNavbar: React.FunctionComponent = () => {
  const loginContext = useContext(LoginContext);

  return (
    <div className="navbar__menu navbar__horizontal">
      <Link to="/">
        <img src="/logo.png" alt="Whale Spotting logo" />
      </Link>

      <div className="navbar__horizontal_content">
        <div className="navbar__horizontal_content_left">
          {" "}
          <span></span>
          {loginContext.isLoggedIn ? (
            <span>
              {"Whale-come " + loginContext.username + "!"}
              <Link
                to="/"
                className="button is-primary"
                onClick={loginContext.logOut}
              >
                Logout
              </Link>
            </span>
          ) : (
            <Link to="/login"> Login </Link>
          )}
        </div>

        <div className="navbar__horizontal_content_right">
          <Link id="home" className="menu-item" to="/">
            Home
          </Link>

          <Link id="sightings" className="menu-item" to="/sightings">
            Sightings
          </Link>
          <Link
            id="ReportSighting"
            className="menu-item"
            to="/sightings/create"
          >
            Report a sighting
          </Link>

          <Link id="plantrip" className="menu-item" to="/plantrip">
            Plan a Trip!
          </Link>
          {!loginContext.isLoggedIn ? (
            <Link id="signup" className="menu-item" to="/sign-up">
              Sign Up
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
