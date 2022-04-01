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
    <div className="navbar__menu">
      <Link to="/" onClick={() => closeMenu()}>
        <img src="/logo.png" alt="Whale Spotting logo" />
      </Link>
      <div>
        {" "}
        {loginContext.isLoggedIn ? (
          "Whale-come " + loginContext.username + "!"
        ) : (
          <Link to="/login" onClick={() => closeMenu()}>
            {" "}
            Login{" "}
          </Link>
        )}
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
          Sightings
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
          id="plantrip"
          className="menu-item"
          to="/plantrip"
          onClick={() => closeMenu()}
        >
          Plan a Trip!
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
        <div>
          {!loginContext.isLoggedIn ? (
            <div>
              <Link
                className="button is-primary"
                to="/login"
                onClick={() => closeMenu()}
              >
                Login
              </Link>
            </div>
          ) : (
            <Link
              to="/"
              className="button is-primary"
              onClick={() => {
                loginContext.logOut();
                closeMenu();
              }}
            >
              Logout
            </Link>
          )}
        </div>
      </Menu>
    </div>
  );
};
