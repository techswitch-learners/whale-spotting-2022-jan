import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../login/LoginManager";
import "./DesktopNavbar.scss";

export const DesktopNavbar: React.FunctionComponent = () => {
  const loginContext = useContext(LoginContext);

  return (
    <div className="desktop-navbar">
      <Link to="/">
        <img
          className="desktop__logo"
          src="/logo.png"
          alt="Whale Spotting logo"
        />
      </Link>{" "}
      <div className="desktop__login">
        {" "}
        {loginContext.isLoggedIn ? (
          "Whale-come " + loginContext.username + "!"
        ) : (
          <Link to="/login"> Login </Link>
        )}
      </div>
      <ul className="desktop__menubar">
        <li className="desktop__menuitem">
          <Link to="/"> Home </Link>
        </li>
        <li>
          <span>Sighting</span>
          <div>
            <li className="desktop__menuitem">
              <Link to="/sightings">All sightings </Link>
            </li>
            <li className="desktop__menuitem">
              <Link to="/sightings/create">Report a sighting </Link>
            </li>
          </div>
        </li>
        <li className="desktop__menuitem">
          <Link to="/plantrip"> Plan a Trip! </Link>
        </li>
        {!loginContext.isLoggedIn ? (
          <li className="desktop__menuitem">
            <Link to="/sign-up"> Sign Up </Link>
          </li>
        ) : (
          <></>
        )}
        <div>
          {!loginContext.isLoggedIn ? (
            <div>
              <li className="desktop__menuitem">
                <Link className="button is-primary" to="/login">
                  Login
                </Link>
              </li>
            </div>
          ) : (
            <li className="desktop__menuitem">
              <Link
                to="/"
                className="button is-primary"
                onClick={() => {
                  loginContext.logOut();
                }}
              >
                Logout
              </Link>
            </li>
          )}
        </div>
      </ul>
    </div>
  );
};
