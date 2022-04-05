import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../login/LoginManager";
import "./Navbar.scss";
import { slide as Menu } from "react-burger-menu";

export const Navbar: React.FunctionComponent = () => {
  const loginContext = useContext(LoginContext);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const closeMenu = () => {
    setNavbarOpen(false);
  };
  const openMenu = () => {
    setNavbarOpen(true);
  };

  return (
    <div className="navbar__menu navbar__burger">
      <Link className="mobile__logo-link" to="/" onClick={() => closeMenu()}>
        <img
          className="mobile__logo"
          src="/logo.png"
          alt="Whale Spotting logo"
        />
      </Link>
      <div className="mobile__welcome">
        {loginContext.isLoggedIn ? (
          <span className="mobile__welcome-message">
            Whale-come {loginContext.username}!
          </span>
        ) : null}
      </div>
      <Menu isOpen={navbarOpen} onClose={closeMenu} onOpen={openMenu} right>
        <Link
          id="home"
          className="menu-item"
          to="/"
          onClick={() => closeMenu()}
        >
          Home
        </Link>
        <Link
          id="sightings"
          className="menu-item"
          to="/sightings"
          onClick={() => closeMenu()}
        >
          All sightings
        </Link>
        <Link
          id="ReportSighting"
          className="menu-item"
          to="/sightings/create"
          onClick={() => closeMenu()}
        >
          Report a sighting
        </Link>
        <Link
          id="leaderboard"
          className="menu-item"
          to="/leaderboard"
          onClick={() => closeMenu()}
        >
          Leaderboard
        </Link>
        <Link
          id="plantrip"
          className="menu-item"
          to="/plantrip"
          onClick={() => closeMenu()}
        >
          Plan a Trip
        </Link>
        {!loginContext.isLoggedIn ? (
          <Link
            id="signup"
            className="menu-item"
            to="/sign-up"
            onClick={() => closeMenu()}
          >
            Sign Up
          </Link>
        ) : (
          <></>
        )}
        {!loginContext.isLoggedIn ? (
          <Link className="menu-item" to="/login" onClick={() => closeMenu()}>
            Login
          </Link>
        ) : (
          <Link
            to="/"
            className="menu-item"
            onClick={() => {
              loginContext.logOut();
              closeMenu();
            }}
          >
            Logout
          </Link>
        )}
      </Menu>
    </div>
  );
};
