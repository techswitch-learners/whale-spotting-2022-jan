import React, { useState, FormEvent, useEffect, useContext } from "react";
import { format, parse } from "date-fns";
import {
  fetchLocations,
  fetchSpecies,
  Species,
  Location,
  createSighting,
} from "../../clients/apiClients";
import { LoginContext } from "../login/LoginManager";
import "./CreateSightingPage.scss";
import { Link } from "react-router-dom";

type FromStatus = "READY" | "SUBMITTING" | "ERROR" | "FINISHED";

export function CreateSightingPage(): JSX.Element {
  const [date, setDate] = useState<Date>(new Date());
  const [locations, setLocations] = useState<Location[]>([]);
  const [locationId, setLocationId] = useState<number>();
  const [speciesList, setSpeciesList] = useState<Species[]>([]);
  const [speciesId, setSpeciesId] = useState<number>();
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [status, setStatus] = useState<FromStatus>("READY");
  const { username, password } = useContext(LoginContext);

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    setStatus("SUBMITTING");
    if (!locationId || !speciesId) {
      setStatus("ERROR");
      return;
    }
    createSighting(
      {
        date,
        locationId,
        speciesId,
        description,
        photoUrl,
      },
      username,
      password
    )
      .then(() => setStatus("FINISHED"))
      .catch(() => setStatus("ERROR"));
  };

  useEffect(() => {
    fetchSpecies().then((response) => setSpeciesList(response));
    fetchLocations().then((response) => setLocations(response));
  }, []);

  const handleSpeciesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSpeciesId(Number(event.target.value));
  };
  const handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLocationId(Number(event.target.value));
  };

  return (
    <main className="reportSighting">
      <div className="reportSighting__header">
        <h1>Hello {username}!</h1>
        <h2>Report a Sighting</h2>
      </div>

      <form onSubmit={submitForm}>
        <div className="reportSighting__form">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={format(date, "yyyy-MM-dd")}
            onChange={(event) =>
              setDate(parse(event.target.value, "yyyy-MM-dd", new Date()))
            }
          />
          <label htmlFor="location">Location</label>
          <select id="location" onChange={(e) => handleLocationChange(e)}>
            <option selected disabled>
              Select Location
            </option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
          <label htmlFor="species">Whale Type</label>
          <select id="species" onChange={(e) => handleSpeciesChange(e)}>
            <option selected disabled>
              Select Species
            </option>
            {speciesList.map((species) => (
              <option key={species.id} value={species.id}>
                {species.name}
              </option>
            ))}
          </select>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Describe your sighting"
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
            className="reportSighting__button btn btn-primary"
            disabled={status === "SUBMITTING"}
            type="submit"
          >
            Create Sighting
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
              <Link to="/Sightings">List of sightings</Link>
            </div>
          ) : (
            <></>
          )}
        </div>
      </form>
    </main>
  );
}
