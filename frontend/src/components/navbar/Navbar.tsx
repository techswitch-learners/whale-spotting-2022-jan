import React, { useContext } from "react";
//import { useState } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../login/LoginManager";
import "./Navbar.scss";
import { slide as Menu } from "react-burger-menu";

export const Navbar: React.FunctionComponent = () => {
  const loginContext = useContext(LoginContext);
  //const [isLoggedIn, setisLoggedIn] = useState(loginContext.isLoggedIn)

  return (
    // <nav className="navbar" role="navigation" aria-label="main navigation">
    //   <Link to="/">
    //     <img src="/logo.png" width={"100px"} alt="Whale Spotting logo" />
    //   </Link>
    //   <Link to="/plantrip" className="button is-primary">
    //     Plan a Trip!
    //   </Link>
    //   <Link to="/sign-up">Sign Up</Link>
    //   <span> </span>
    //   <Link to="/sightings/create">Report Sighting</Link>
    //   <span> </span>
    //   <Link to="/sightings">All Sightings</Link>
    //   <div>
    //     {!loginContext.isLoggedIn ? (
    //       <div>
    //         <Link className="button is-primary" to="/login">
    //           Login
    //         </Link>
    //       </div>
    //     ) : (
    //       <Link
    //         to="/"
    //         className="button is-primary"
    //         onClick={loginContext.logOut}
    //       >
    //         Logout
    //       </Link>
    //     )}
    //   </div>
    <div className="navbar__menu">
      <Link to="/">
        <img src="/logo.png" width={"100px"} alt="Whale Spotting logo" />
      </Link>
      <Menu right>
        <Link id="home" className="menu-item" to="/">
          Home
        </Link>
        <Link id="sightings" className="menu-item" to="/sightings">
          Sightings
        </Link>
        <Link
          id="sightings_create"
          className="menu-item"
          to="/sightings/create"
        >
          Report a sighting
        </Link>
        <Link id="plantrip" className="menu-item" to="/plantrip">
          Plan a Trip!
        </Link>
        {/* <a id="ReportSighting" className="menu-item" href="/sightings/create">
          Report a sighting
        </a> */}
        <Link id="signup" className="menu-item" to="/sign-up">
          Sign Up
        </Link>
        <div>
          {!loginContext.isLoggedIn ? (
            <div>
              <Link className="button is-primary" to="/login">
                Login
              </Link>
            </div>
          ) : (
            <Link
              to="/"
              className="button is-primary"
              onClick={loginContext.logOut}
            >
              Logout
            </Link>
          )}
        </div>
        {/* <a id="Login" className="menu-item" href="/Login">
          Login
        </a> */}
      </Menu>
    </div>
  );
};
