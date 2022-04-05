import React, { useState, FormEvent, useEffect, useContext } from "react";
import {
  fetchEndangeredStatus,
  EndangeredStatus,
  createSpecies,
} from "../../clients/apiClients";
import { LoginContext } from "../login/LoginManager";
import "./CreateSpeciesPage.scss";
import { Link } from "react-router-dom";

type FromStatus = "READY" | "SUBMITTING" | "ERROR" | "FINISHED";

export function CreateSpeciesPage(): JSX.Element {
  const [endangeredStatuses, setEndangeredStatuses] = useState<
    EndangeredStatus[]
  >([]);
  const [endangeredStatusId, setEndangeredStatusId] = useState<number>();
  const [name, setName] = useState("");
  const [latinName, setLatinName] = useState("");
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [status, setStatus] = useState<FromStatus>("READY");
  const { username, password } = useContext(LoginContext);

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    setStatus("SUBMITTING");
    if (!endangeredStatusId) {
      setStatus("ERROR");
      return;
    }
    createSpecies(
      {
        name,
        latinName,
        photoUrl,
        description,
        endangeredStatusId,
      },
      username,
      password
    )
      .then(() => setStatus("FINISHED"))
      .catch(() => setStatus("ERROR"));
  };

  useEffect(() => {
    fetchEndangeredStatus().then((response) => setEndangeredStatuses(response));
  }, []);

  const handleEndangeredStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEndangeredStatusId(Number(event.target.value));
  };

  return (
    <main className="createSpecies">
      <div className="createSpecies__header">
        <h1>Create Species</h1>
      </div>

      <form onSubmit={submitForm}>
        <div className="createSpecies__form">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <label htmlFor="latinName">Latin Name</label>
          <input
            id="latinName"
            placeholder="Latin Name"
            value={latinName}
            onChange={(event) => setLatinName(event.target.value)}
          />
          <label htmlFor="endangeredStatus">Endangered Status</label>
          <select
            id="endangeredStatus"
            onChange={(e) => handleEndangeredStatusChange(e)}
          >
            <option selected disabled>
              Select Endangered Status
            </option>
            {endangeredStatuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Describe whale species"
            rows={3}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <label htmlFor="photo">Photo</label>
          <input
            id="photo"
            placeholder="Photo URL"
            value={photoUrl}
            onChange={(event) => setPhotoUrl(event.target.value)}
          />

          <button
            className="createSpecies__button btn btn-primary"
            disabled={status === "SUBMITTING"}
            type="submit"
          >
            Create Species
          </button>
          {status === "ERROR" ? (
            <div className="createSpecies__error">
              <p>ERROR: Please make sure all fields have been filled in</p>
            </div>
          ) : (
            <></>
          )}
          {status === "FINISHED" ? (
            <div className="createSpecies__success">
              Form submitted successfully.&ensp;
              <Link to="/species">List of species</Link>
            </div>
          ) : (
            <></>
          )}
        </div>
      </form>
    </main>
  );
}
