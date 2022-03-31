import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../login/LoginManager";
import "./Navbar.scss";
import { BurgerMenu } from "./BurgerMenu";
import { HorizontalMenu } from "./HorizontalMenu";
import { slide as Menu } from "react-burger-menu";

export const Navbar: React.FunctionComponent = () => {
  return (
    <>
      <BurgerMenu />
      <HorizontalMenu />
    </>
  );
};
