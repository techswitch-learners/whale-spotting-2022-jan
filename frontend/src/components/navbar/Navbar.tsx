import React from "react";
import { MobileNavbar } from "./MobileNavbar";
import { DesktopNavbar } from "./DesktopNavbar";

export const Navbar: React.FunctionComponent = () => {
  return (
    <>
      <MobileNavbar />
      <DesktopNavbar />
    </>
  );
};
