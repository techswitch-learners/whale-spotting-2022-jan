import React, { useState, FormEvent, useEffect, useContext } from "react";
import {
  fetchEndangeredStatus,
  EndangeredStatus,
  updateSpecies,
  fetchSpeciesById,
} from "../../clients/apiClients";
import { LoginContext } from "../login/LoginManager";
import "./UpdateSpeciesPage.scss";
import { Link, useParams } from "react-router-dom";

type FromStatus = "READY" | "SUBMITTING" | "ERROR" | "FINISHED";

export function UpdateSpeciesPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
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

  const speciesId = parseInt(id);

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
    fetchSpeciesById(speciesId).then(
      (response) => (
        setName(response.name),
        setLatinName(response.latinName),
        setDescription(response.description),
        setEndangeredStatusId(response.endangeredStatusId),
        setPhotoUrl(response.photoUrl)
      )
    );
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
            value={endangeredStatusId}
          >
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
            maxLength={2048}
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
              <p>
                ERROR: Please make sure all fields have been filled in and the
                description is not too long
              </p>
            </div>
          ) : (
            <></>
          )}
          {status === "FINISHED" ? (
            <div className="updateSpecies__success">
              Form submitted successfully.&ensp;
              <Link to="/species/meetwhales">Back to Meet The Whales</Link>
            </div>
          ) : (
            <></>
          )}
        </div>
      </form>
    </main>
  );
}
