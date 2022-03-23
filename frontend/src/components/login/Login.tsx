import React, { FormEvent, useState, useContext } from "react";
import { login } from "../../clients/apiClients";
import { LoginContext } from "../login/LoginManager";
import "./Login.scss"

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
    setError(undefined);
  }

  return (
    <div className="login">
      {error && <p>{error}</p>}
      <h1>Log In to Whale Spotting!</h1>
      <form onSubmit={tryLogin}>
        <label className="field">
          Username
          <input
            type={"text"}
            value={username}
            placeholder="Username"
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label className="field">
          Password
          <input
            type={"password"}
            value={password}
            placeholder="Password"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        <button type="submit">Log In</button>
      </form>
    </div>
  );
};
