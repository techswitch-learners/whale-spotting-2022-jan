import React, { useState, FormEvent, useEffect, useContext } from "react";
import { fetchAllUsers, User } from "../../../clients/apiClients";
import { LoginContext } from "../../login/LoginManager";
import { Link } from "react-router-dom";
import { addAdmin } from "../../../clients/apiClients";

type FromStatus = "READY" | "SUBMITTING" | "ERROR" | "FINISHED";

export function AddAdmin(): JSX.Element {
  const [users, setUsers] = useState<Array<User>>([]);
  const [userId, setUserId] = useState<number>();
  const [role, setRole] = useState<number>();
  const [status, setStatus] = useState<FromStatus>("READY");
  const { username, password } = useContext(LoginContext);

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    setStatus("SUBMITTING");
    if (!userId || !role) {
      setStatus("ERROR");
      return;
    }
    addAdmin(
      userId,
      {
        role,
      },
      username,
      password
    )
      .then(() => setStatus("FINISHED"))
      .catch(() => setStatus("ERROR"));
  };

  useEffect(() => {
    fetchAllUsers().then((response) => setUsers(response));
  }, []);

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
  };

  return (
    <form onSubmit={submitForm}>
      <div className="reportSighting__form">
        <label htmlFor="location">User</label>
        <select id="location" onChange={(e) => handleUserIdChange(e)}>
          <option selected disabled>
            Select User
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username} {user.role === 0 ? "(user)" : "(admin)"}
            </option>
          ))}
        </select>
        <button
          className="reportSighting__button btn btn-primary"
          disabled={status === "SUBMITTING"}
          type="submit"
        >
          Update Role
        </button>
        {status === "ERROR" ? (
          <div className="reportSighting__error">
            <p>ERROR: Please make sure all fields have been filled in</p>
          </div>
        ) : (
          <></>
        )}
        {status === "FINISHED" ? (
          <div className="reportSighting__success">
            Form submitted successfully.&ensp;
            <Link to="/users/update">Update another user</Link>
          </div>
        ) : (
          <></>
        )}
      </div>
    </form>
  );
}
