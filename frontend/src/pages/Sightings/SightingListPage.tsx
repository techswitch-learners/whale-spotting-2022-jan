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
import { Link } from "react-router-dom";

export function SightingListPage(): JSX.Element {
  const [sightings, setSightings] = useState<Array<Sighting>>([]);
  const [combinedSightingList, setCombinedSightingList] = useState<
    Array<Sighting | ExternalSighting>
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { username, password } = useContext(LoginContext);

  useEffect(() => {
    setLoading(true);
    Promise.all([getAllSightings(), getExternalSightings()]).then(
      ([sightings, externalSightings]) => {
        const combinedSightings: Array<Sighting | ExternalSighting> = [];
        setCombinedSightingList(
          combinedSightings
            .concat(sightings, externalSightings)
            .sort((a, b) => +new Date(b.date) - +new Date(a.date))
        );
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return <h1 className="sighting__list__loading">Loading...</h1>;
  }

  if (combinedSightingList.length === 0) {
    return (
      <h1 className="sighting__list__loading">
        There are no whale sightings... yet!
        <Link to="/sightings/create"> Click here </Link>
        to report the first sighting.
      </h1>
    );
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
