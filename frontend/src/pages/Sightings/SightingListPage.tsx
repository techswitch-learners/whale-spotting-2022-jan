import { useContext, useEffect, useState } from "react";
import "./SightingListPage.scss";
import {
  approveSighting,
  deleteSighting,
  Sighting,
  ExternalSighting,
} from "../../clients/apiClients";
import {
  getAllSightings,
  getExternalSightings,
} from "../../clients/apiClients";
import { LoginContext } from "../../components/login/LoginManager";
import { SightingList } from "../../components/SightingListPage/SightingList/SightingList";

export function SightingListPage(): JSX.Element {
  const [sightings, setSightings] = useState<Array<Sighting>>([]);
  const [combinedSightingList, setCombinedSightingList] = useState<
    Array<Sighting | ExternalSighting>
  >([]);
  const { username, password } = useContext(LoginContext);

  useEffect(() => {
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
  }, []);

  if (combinedSightingList.length == 0) {
    return <div>loading...</div>;
  }

  return (
    <div className="sighting__list__body">
      <h1 className="sighting__list__title">Sightings</h1>
      <SightingList
        setCombinedSightingList={setCombinedSightingList}
        combinedSightingList={combinedSightingList}
      />
    </div>
  );
}
