import { useContext } from "react";
import { LoginContext } from "./LoginManager";
import { Login } from "./Login";
import { Route } from "react-router";
import { Home } from "../homepage/Home";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export const TryLogin = () => {
  const loginContext = useContext(LoginContext);

  const notify = () => {
    toast.success("You are now logged in!");
  };

  if (!loginContext.isLoggedIn) {
    return <Login />;
  } else {
    notify();
    return (
      <div>
        <Route path="/">
          <Home />
        </Route>
      </div>
    );
  }
};
