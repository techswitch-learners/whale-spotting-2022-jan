import React, { FormEvent, useState, useContext } from "react";
import { loginUser } from "../../api/apiClient";
import { LoginContext } from "../login/LoginManager";

export const Login: React.FunctionComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(undefined);
  const loginContext = useContext(LoginContext);

  function tryLogin(event: FormEvent) {
    event.preventDefault();
    loginUser(username, password)
      .then(() => {
        loginContext.logIn(username, password);
        setError(undefined);
      })
      .catch((err) => setError(err.message));
  }

  return (
    <div>
      {error && <p>{error}</p>}
      <h1>Log In</h1>
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
