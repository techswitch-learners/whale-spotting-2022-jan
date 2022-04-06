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
import { ExternalApiSighting } from "./Sighting/ExternalApiSighting";

export function SightingListPage(): JSX.Element {
  const [sightings, setSightings] = useState<Array<Sighting>>([]);
  const [externalSightings, setExternalSightings] = useState<
    Array<ExternalSighting>
  >([]);
  const [combined, setCombined] = useState<Array<Sighting | ExternalSighting>>(
    []
  );
  const { username, password } = useContext(LoginContext);

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
            <ExternalApiSighting s={s} i={i} />
          )
        )}
      </ul>
    </div>
  );
}
