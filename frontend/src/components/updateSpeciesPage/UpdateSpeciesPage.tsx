import React, { useState, FormEvent, useEffect, useContext } from "react";
import {
  fetchEndangeredStatus,
  EndangeredStatus,
  updateSpecies,
  fetchSpeciesById,
  UpdateSpecies,
} from "../../clients/apiClients";
import { LoginContext } from "../login/LoginManager";
import "./UpdateSpeciesPage.scss";
import { Link } from "react-router-dom";

type FromStatus = "READY" | "SUBMITTING" | "ERROR" | "FINISHED";

export function UpdateSpeciesPage(): JSX.Element {
  const [species, setSpecies] = useState<UpdateSpecies>();
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

  const speciesId = 1;

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    setStatus("SUBMITTING");
    if (!endangeredStatusId) {
      setStatus("ERROR");
      return;
    }
    updateSpecies(
      speciesId,
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
    fetchSpeciesById(speciesId).then((response) => setSpecies(response));
  }, []);

  useEffect(() => {
    fetchEndangeredStatus().then((response) => setEndangeredStatuses(response));
  }, []);

  const handleEndangeredStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEndangeredStatusId(Number(event.target.value));
  };

  return (
    <main className="updateSpecies">
      <div className="updateSpecies__header">
        <h1>Update Species</h1>
      </div>

      <form onSubmit={submitForm}>
        <div className="updateSpecies__form">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            placeholder="Name"
            value={species?.name}
            onChange={(event) => setName(event.target.value)}
          />
          <label htmlFor="latinName">Latin Name</label>
          <input
            id="latinName"
            placeholder="Latin Name"
            value={species?.latinName}
            onChange={(event) => setLatinName(event.target.value)}
          />
          <label htmlFor="endangeredStatus">Endangered Status</label>
          <select
            id="endangeredStatus"
            onChange={(e) => handleEndangeredStatusChange(e)}
          >
            <option selected disabled>
              Select Status
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
            value={species?.description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <label htmlFor="photo">Photo</label>
          <input
            id="photo"
            placeholder="Photo URL"
            value={species?.photoUrl}
            onChange={(event) => setPhotoUrl(event.target.value)}
          />
          <label></label>
          <button
            className="updateSpecies__button btn btn-primary"
            disabled={status === "SUBMITTING"}
            type="submit"
          >
            Update Species
          </button>
          {status === "ERROR" ? (
            <div className="updateSpecies__error">
              <p>ERROR: Please make sure all fields have been filled in</p>
            </div>
          ) : (
            <></>
          )}
          {status === "FINISHED" ? (
            <div className="updateSpecies__success">
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
