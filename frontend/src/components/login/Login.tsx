import React, { FormEvent, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { login } from "../../clients/apiClients";
import { LoginContext } from "../login/LoginManager";
import "./Login.scss";
import { notifyOfSuccessfulLogin } from "./LoginNotification";

export const Login: React.FunctionComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();
  const loginContext = useContext(LoginContext);

  async function tryLogin(event: FormEvent) {
    event.preventDefault();
    try {
      await login(username, password);
    } catch (e) {
      setError((e as Error).message);
      return;
    }
    loginContext.logIn(username, password);
    notifyOfSuccessfulLogin();
    setError(undefined);
  }

  return (
    <div className="login">
      {error && (
        <p className="login__failure__notification">
          Login failed. Please try again.
        </p>
      )}
      <h1 className="mb-4 mt-2">Whale-come!</h1>
      <h3>Please login below</h3>
      <form onSubmit={tryLogin} className="login-form">
        <div className="row mb-2">
          <div className="col-sm-10">
            <input
              type={"text"}
              value={username}
              placeholder="Username"
              required
              onChange={(event) => setUsername(event.target.value)}
              className="login-input"
            />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-sm-10">
            <input
              type={"password"}
              value={password}
              placeholder="Password"
              required
              onChange={(event) => setPassword(event.target.value)}
              className="login-input"
            />
          </div>
        </div>
        <button className="submit-button-login btn btn-primary" type="submit">
          Log In
        </button>
      </form>
      <p>
        Not a member? <Link to="/sign-up">Sign up!</Link>
      </p>
    </div>
  );
};
