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

  if (status === "FINISHED") {
    return (
      <div>
        <p>Form Submitted Successfully!</p>
        <Link to="/Sightings">Move to the list of sightings?</Link>
      </div>
    );
  }

  return (
    <main>
      <h1>Hello {username}!</h1>
      <h2>Report a Sighting!</h2>
      <form onSubmit={submitForm}>
        <label htmlFor="date">
          Date
          <input
            type="date"
            value={format(date, "yyyy-MM-dd")}
            onChange={(event) =>
              setDate(parse(event.target.value, "yyyy-MM-dd", new Date()))
            }
          />
        </label>
        <label>
          Location
          <select onChange={(e) => handleLocationChange(e)}>
            <option selected disabled>
              Select Location
            </option>
            {locations.map((location, key) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Whale Type
          <select onChange={(e) => handleSpeciesChange(e)}>
            <option selected disabled>
              Select Species
            </option>
            {speciesList.map((species, key) => (
              <option key={species.id} value={species.id}>
                {species.name}
              </option>
            ))}
          </select>
        </label>
        <div></div>
        <label>
          Description
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <label>
          Photo
          <input
            value={photoUrl}
            onChange={(event) => setPhotoUrl(event.target.value)}
          />
        </label>
        <button disabled={status === "SUBMITTING"} type="submit">
          Create Sighting
        </button>
      </form>
      {status === "ERROR" ? (
        <div>
          <p>ERROR: Please make sure all fields have been filled in</p>
        </div>
      ) : (
        <></>
      )}
    </main>
  );
}
