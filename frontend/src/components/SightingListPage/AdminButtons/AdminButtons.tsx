import React, { useContext } from "react";
import {
  approveSighting,
  deleteSighting,
  getAllSightings,
  Sighting,
} from "../../../clients/apiClients";
import { LoginContext } from "../../login/LoginManager";

export function AdminButtons({
  sighting,
  setSightings,
}: {
  sighting: Sighting;
  setSightings: React.Dispatch<React.SetStateAction<Sighting[]>>;
}): JSX.Element {
  const { username, password } = useContext(LoginContext);

  const confirmWhaleSighting = (sightingId: number) => {
    if (sightingId) {
      approveSighting(sightingId, username, password).then(() =>
        getAllSightings().then(setSightings)
      );
    }
  };
  const deleteWhaleSighting = (sightingId: number) => {
    if (sightingId) {
      deleteSighting(sightingId, username, password).then(() =>
        getAllSightings().then(setSightings)
      );
    }
  };

  return (
    <div className="sighting__card__btns">
      <button
        className="sighting__button btn btn-primary"
        disabled={!!sighting.approvedBy}
        onClick={() => {
          confirmWhaleSighting(sighting.id);
        }}
        type="submit"
      >
        Confirm
      </button>
      <button
        className="sighting__button btn btn-primary"
        onClick={() => {
          deleteWhaleSighting(sighting.id);
        }}
        type="submit"
      >
        Delete
      </button>
    </div>
  );
}
