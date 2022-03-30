import { useContext } from "react";
import { LoginContext } from "./LoginManager";
import { Login } from "./Login";
import { Route } from "react-router";
import { Home } from "../homepage/Home";

export const TryLogin = () => {
  const loginContext = useContext(LoginContext);

  if (!loginContext.isLoggedIn) {
    return <Login />;
  } else {
    return (
      <div>
        <Route path="/">
          <Home />
        </Route>
      </div>
    );
  }
};
