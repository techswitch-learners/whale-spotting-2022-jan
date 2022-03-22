import { useContext } from "react";
import { LoginContext } from "./LoginManager";
import { Login } from "./Login";
import { Redirect } from "react-router";

export const TryLogin = () => {
  const loginContext = useContext(LoginContext);

  if (!loginContext.isLoggedIn) {
    return <Login />;
  }

  return (
    <div>
      <Redirect to="/" />
    </div>
  );
};
