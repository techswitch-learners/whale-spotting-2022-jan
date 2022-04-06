import { useContext, useEffect, useState } from "react";
import "./SightingListPage.scss";
import {
  approveSighting,
  deleteSighting,
  Sighting,
  ExternalSighting,
} from "../../clients/apiClients";
import {
  GetAllSightings,
  GetExternalSightings,
} from "../../clients/apiClients";
import { LoginContext } from "../../components/login/LoginManager";
import { InternalSighting } from "./Sighting/InternalSighting";

export function SightingListPage(): JSX.Element {
  const [sightings, setSightings] = useState<Array<Sighting>>([]);
  const [externalSightings, setExternalSightings] = useState<
    Array<ExternalSighting>
  >([]);
  const [combined, setCombined] = useState<Array<Sighting | ExternalSighting>>(
    []
  );
  const { username, password, isAdmin } = useContext(LoginContext);

  useEffect(() => {
    Promise.all([GetAllSightings(), GetExternalSightings()]).then(
      ([sightings, externalSightings]) => {
        const combinedSightings: Array<Sighting | ExternalSighting> = [];
        setCombined(
          combinedSightings
            .concat(sightings, externalSightings)
            .sort(
              (a, b) =>
                Date.parse(a.date.toString()) - Date.parse(b.date.toString())
            )
            .reverse()
        );
      }
    );
  }, []);

  const confirmWhaleSighting = (sightingId: number) => {
    if (sightingId) {
      approveSighting(sightingId, username, password).then(() =>
        GetAllSightings().then(setSightings)
      );
    }
  };
  const deleteWhaleSighting = (sightingId: number) => {
    if (sightingId) {
      deleteSighting(sightingId, username, password).then(() =>
        GetAllSightings().then(setSightings)
      );
    }
  };

  function isInternalSighting(s: Sighting | ExternalSighting): s is Sighting {
    return (s as Sighting).approvedBy !== undefined;
  }

  if (combined.length == 0) {
    return <div>loading...</div>;
  }

  return (
    <div className="sighting__list__body">
      <h1 className="sighting__list__title">Sightings</h1>
      <ul className="list-group list-group-flush">
        {combined.map((s, i) =>
          isInternalSighting(s) ? (
            <InternalSighting
              s={s}
              confirmWhaleSighting={confirmWhaleSighting}
              deleteWhaleSighting={deleteWhaleSighting}
              i={i}
            />
          ) : (
            <li className="sighting__list__item" key={i}>
              <div className="sighting__card">
                <h2 className="sighting__card__title">
                  {s.species[0].name} ({s.species[0].latinName})
                </h2>
                <img
                  className="sighting__image"
                  src={s.photoUrl}
                  alt={s.description}
                  width="250"
                />
                <div className="sighting__card__info">
                  <p>About: {s.description}</p>
                  <p>Sighting Location: {s.location.name}</p>
                  <p>On: {new Date(s.date).toLocaleDateString("en-gb")}</p>
                  <p>Seen by: {s.email}</p>
                  <p>Confirmed ☑</p>
                </div>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
