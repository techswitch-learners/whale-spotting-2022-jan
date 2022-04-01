import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../login/LoginManager";
import "./DesktopNavbar.scss";

export const DesktopNavbar: React.FunctionComponent = () => {
  const loginContext = useContext(LoginContext);

  return (
    <div className="navbar__menu navbar__horizontal">
      <li>
        <Link to="/">
          <img src="/logo.png" alt="Whale Spotting logo" />
        </Link>{" "}
      </li>

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
          <ul>
            <li>
              <Link to="/"> Home </Link>
            </li>
            <li>
              <Link to="/sightings"> Sightings </Link>
            </li>
            <li>
              <Link to="/sightings/create">Report a sighting </Link>
            </li>
            <li>
              <Link to="/plantrip"> Plan a Trip! </Link>
            </li>
            {!loginContext.isLoggedIn ? (
              <li>
                <Link to="/sign-up"> Sign Up </Link>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
