import React, { useState, FormEvent, useEffect, useContext } from "react";
import { fetchAllUsers, User } from "../../../clients/apiClients";
import { LoginContext } from "../../login/LoginManager";
import { Link } from "react-router-dom";
import { addAdmin } from "../../../clients/apiClients";
import { ToastContainer } from "react-bootstrap";
import { toast } from "react-toastify";

type FromStatus = "READY" | "SUBMITTING" | "ERROR" | "FINISHED";

export function AddAdmin(): JSX.Element {
  const [users, setUsers] = useState<Array<User>>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const [userId, setUserId] = useState<number>();
  const [role, setRole] = useState<number>();
  const [status, setStatus] = useState<FromStatus>("READY");
  const { username, password } = useContext(LoginContext);

  const roles = [
    { id: 0, name: "User" },
    { id: 1, name: "Admin" },
  ];

  const handleReset = () => {
    const selectors = document.querySelectorAll("select");
    // reset initial values for each selector element
    selectors.forEach((s) => (s.value = s[0].innerHTML));
  };

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    setStatus("SUBMITTING");
    if (!userId || (role !== 0 && role !== 1)) {
      setStatus("ERROR");
      return;
    }
    addAdmin(
      {
        role,
        userId,
      },
      username,
      password
    )
      .then(() => {
        setStatus("FINISHED");
        toast("User role updated!");
        handleReset();
      })
      .catch(() => setStatus("ERROR"));
  };

  useEffect(() => {
    fetchAllUsers().then((response) => setUsers(response));
  }, []);

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newUserId = Number(event.target.value);
    setUserId(newUserId);
    setCurrentUser(users.filter((u) => u.id === newUserId)[0]);
  };

  const handleUserRoleChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRole(Number(event.target.value));
  };

  return (
    <form onSubmit={submitForm}>
      <ToastContainer />
      <div className="reportSighting__form">
        <label htmlFor="user">User</label>
        <select id="user" onChange={(e) => handleUserIdChange(e)}>
          <option selected disabled>
            Select User
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username} {user.role === 0 ? "(user)" : "(admin)"}
            </option>
          ))}
        </select>
        <label htmlFor="role">Role</label>
        <select id="role" onChange={(e) => handleUserRoleChange(e)}>
          <option selected disabled>
            Select Role
          </option>
          {roles
            .filter((r) => r.id !== currentUser?.role)
            .map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
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
