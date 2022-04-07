import React, { useContext } from "react";
import {
  approveSighting,
  deleteSighting,
  ExternalSighting,
  getAllSightings,
  getExternalSightings,
  Sighting,
} from "../../../clients/apiClients";
import { LoginContext } from "../../login/LoginManager";

export function AdminButtons({
  sighting,
  setCombinedSightingList,
}: {
  sighting: Sighting;
  setCombinedSightingList: React.Dispatch<
    React.SetStateAction<(Sighting | ExternalSighting)[]>
  >;
}): JSX.Element {
  const { username, password } = useContext(LoginContext);

  const confirmWhaleSighting = (sightingId: number) => {
    if (sightingId) {
      approveSighting(sightingId, username, password).then(() => {
        Promise.all([getAllSightings(), getExternalSightings()]).then(
          ([sightings, externalSightings]) => {
            const combinedSightings: Array<Sighting | ExternalSighting> = [];
            setCombinedSightingList(
              combinedSightings
                .concat(sightings, externalSightings)
                .sort((a, b) => +new Date(b.date) - +new Date(a.date))
            );
          }
        );
      });
    }
  };
  const deleteWhaleSighting = (sightingId: number) => {
    if (sightingId) {
      deleteSighting(sightingId, username, password).then(() => {
        Promise.all([getAllSightings(), getExternalSightings()]).then(
          ([sightings, externalSightings]) => {
            const combinedSightings: Array<Sighting | ExternalSighting> = [];
            setCombinedSightingList(
              combinedSightings
                .concat(sightings, externalSightings)
                .sort((a, b) => +new Date(b.date) - +new Date(a.date))
            );
          }
        );
      });
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
