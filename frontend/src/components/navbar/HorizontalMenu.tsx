import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../login/LoginManager";
import "./Navbar.scss";

export const HorizontalMenu: React.FunctionComponent = () => {
  const loginContext = useContext(LoginContext);

  return (
    <div className="navbar__menu navbar__horizontal">
      <Link to="/">
        <img src="/logo.png" alt="Whale Spotting logo" />
      </Link>
      <div>
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

      <Link to="/plantrip" className="button is-primary">
        Plan a Trip!
      </Link>
      <Link to="/sign-up">Sign Up</Link>
      <span> </span>
      <Link to="/sightings/create">Report Sighting</Link>
      <span> </span>
      <Link to="/sightings">All Sightings</Link>
    </div>
  );
};
