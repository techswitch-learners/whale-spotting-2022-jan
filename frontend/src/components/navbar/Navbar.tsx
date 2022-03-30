import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../login/LoginManager";
import "./Navbar.scss";
import { slide as Menu } from "react-burger-menu";

export const Navbar: React.FunctionComponent = () => {
  const loginContext = useContext(LoginContext);

  return (
    // <nav role="navigation" aria-label="main navigation">
    //   <Link to="/">
    //     <img src="/logo.png" alt="Whale Spotting logo" />
    //   </Link>
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
    // </nav>
    <div className="navbar__menu">
      <Link to="/">
        <img src="/logo.png" alt="Whale Spotting logo" />
      </Link>
      <Menu right>
        <a id="home" className="menu-item" href="/">
          Home
        </a>
        <a id="sightings" className="menu-item" href="/sightings">
          Sightings
        </a>
        <a id="ReportSighting" className="menu-item" href="/sightings/create">
          Report a sighting
        </a>
        <a id="Login" className="menu-item" href="/Login">
          Login
        </a>
      </Menu>
    </div>
  );
};
