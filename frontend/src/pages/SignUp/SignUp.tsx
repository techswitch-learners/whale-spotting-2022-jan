import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { createUser } from "../../clients/apiClients";
import "../../styles/constants.scss";
import "./SignUp.scss";
type FromStatus = "READY" | "SUBMITTING" | "ERROR" | "FINISHED";

export function SignUpForm(): JSX.Element {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<FromStatus>("READY");

  function submitForm(event: FormEvent) {
    event.preventDefault();
    setStatus("SUBMITTING");
    createUser({ name, username, email, password })
      .then(() => setStatus("FINISHED"))
      .catch(() => setStatus("ERROR"));
  }

  if (status === "FINISHED") {
    return (
      <div>
        <p>Thanks for signing up!</p>
        <Link to="/login">Please login here to continue</Link>
      </div>
    );
  }

  return (
    <div className="signup__form__body">
      <h1 className="signup__form__title">Create an account here!</h1>
      <h5 className="signup__form__secondary__title">
        Please fill in all the required fields below
      </h5>
      <form className="signup__form" onSubmit={submitForm}>
        <div className="row mb-2">
          <div className="col-sm-10">
            <input
              className="form__input"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Name"
              required
            />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-sm-10">
            <input
              className="form__input"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Username"
              required
            />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-sm-10">
            <input
              className="form__input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              required
            />
          </div>
        </div>
        <div className="row-mb-2">
          <div className="col-sm-10">
            <input
              className="form__input"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              type="password"
              required
            />
          </div>
        </div>

        <button
          className="submit-button-login btn btn-primary"
          disabled={status === "SUBMITTING"}
          type="submit"
        >
          Sign Up
        </button>
        {status === "ERROR" && <p>Something went wrong! Please try again!</p>}
      </form>
      <p className="signup__page__login__link">
        Already a member? <Link to="/login">Log in here!</Link>
      </p>
    </div>
  );
}

export function CreateUser(): JSX.Element {
  return (
    <div>
      <SignUpForm />
    </div>
  );
}
