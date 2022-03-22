import React, { FormEvent, useState } from "react";
import { CreateUser } from "../../api/apiClient";
import { Redirect } from "react-router";

export const CreateAdmin: React.FunctionComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(undefined);

  function tryLogin(event: FormEvent) {
    event.preventDefault();
    CreateUser({ name, username, password })
      .then(() => {
        setRedirect(true);
        setError(undefined);
      })
      .catch((err) => setError(err.message));
  }

  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      {error && <p className="notification is-danger">{error}</p>}
      <h1>Log In</h1>
      <form onSubmit={tryLogin}>
        <label className="field">
          Name
          <input
            className="input"
            type={"text"}
            value={name}
            placeholder="Name"
            required
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label className="field">
          Username
          <input
            className="input"
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
            className="input"
            type={"password"}
            value={password}
            placeholder="Password"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};
