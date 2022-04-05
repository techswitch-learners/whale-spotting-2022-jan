import React, { createContext, useState } from "react";

type LoginContextType = {
  isLoggedIn: boolean;
  isAdmin: boolean;
  username: string;
  password: string;
  logIn: (username: string, password: string, isAdmin: boolean) => void;
  logOut: () => void;
};

export const LoginContext = createContext<LoginContextType>({
  isLoggedIn: false,
  isAdmin: false,
  username: "",
  password: "",
  logIn: () => {
    console.log();
  },
  logOut: () => {
    console.log();
  },
});

export const LoginManager: React.FunctionComponent = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [contextusername, setUsername] = useState("");
  const [contextPassword, setPassword] = useState("");
  const [Admin, setAdmin] = useState(false);

  function logIn(username: string, password: string, isAdmin: boolean) {
    setUsername(username);
    setPassword(password);
    setLoggedIn(true);
    setAdmin(isAdmin);
  }

  function logOut() {
    setLoggedIn(false);
    setUsername("");
    setPassword("");
    setAdmin(false);
  }

  const context = {
    isLoggedIn: loggedIn,
    isAdmin: Admin,
    username: contextusername,
    password: contextPassword,
    logIn: logIn,
    logOut: logOut,
  };

  return (
    <LoginContext.Provider value={context}>{children}</LoginContext.Provider>
  );
};
