import React, { useState, FormEvent, useEffect } from "react";
import { format, parse } from "date-fns";
import {
  fetchLocations,
  fetchSpecies,
  Species,
  Location,
} from "../../clients/apiClient";

export function CreateSightingPage(): JSX.Element {
  const [date, setDate] = useState<Date>(new Date());
  const [locations, setLocations] = useState<Location[]>([]);
  const [location, setLocation] = useState("");
  const [speciesList, setSpeciesList] = useState<Species[]>([]);
  const [species, setSpecies] = useState<string>("");
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [userId, setUserId] = useState("");

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
  };

  useEffect(() => {
    fetchSpecies().then((response) => setSpeciesList(response));
    fetchLocations().then((response) => setLocations(response));
  }, []);

  const handleSpeciesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSpecies(event.target.value);
  };
  const handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLocation(event.target.value);
  };

  return (
    <main>
      <h1>Report a Sighting!</h1>
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
              <option key={key} value={key}>
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
              <option key={key} value={key}>
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
        <button type="submit">Create Sighting</button>
      </form>
    </main>
  );
}
