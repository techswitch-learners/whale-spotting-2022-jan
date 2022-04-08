import { useContext, useEffect, useState } from "react";
import "./SightingListPage.scss";
import { Sighting, ExternalSighting } from "../../clients/apiClients";
import {
  getAllSightings,
  getExternalSightings,
} from "../../clients/apiClients";
import { LocationSelector } from "../../components/planATripPage/Locations/LocationSelector/LocationSelector";
import { SpeciesSelector } from "./SpeciesSelector/SpeciesSelector";
import { UsersSelector } from "./UsersSelector/UsersSelector";
import ReactPaginate from "react-paginate";
import { SightingList } from "../../components/SightingListPage/SightingList/SightingList";
import { Link } from "react-router-dom";

export function SightingListPage(): JSX.Element {
  const [selectedLocationId, setSelectedLocationId] = useState<string>("");
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [combinedSightingList, setCombinedSightingList] = useState<
    Array<Sighting | ExternalSighting>
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getAllSightings(+selectedLocationId, +selectedSpeciesId, +selectedUserId),
      getExternalSightings(),
    ]).then(([sightings, externalSightings]) => {
      const combinedSightings: Array<Sighting | ExternalSighting> = [];
      setCombinedSightingList(
        combinedSightings
          .concat(sightings, externalSightings)
          .sort((a, b) => +new Date(b.date) - +new Date(a.date))
      );
      setLoading(false);
    });
  }, [selectedLocationId, selectedSpeciesId, selectedUserId]);

  const perPage = 2;
  const pageCount = Math.ceil(combinedSightingList.length / perPage);

  if (loading) {
    return <h1 className="sighting__list--loading">Loading...</h1>;
  }

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  if (combinedSightingList.length === 0) {
    return (
      <h1 className="sighting__list--loaded">
        There are no whale sightings... yet!
        <Link to="/sightings/create"> Click here </Link>
        to report the first sighting.
      </h1>
    );
  }

  return (
    <div className="sighting__list__body">
      <h1 className="sighting__list__title">Sightings</h1>
      <section className="sightings__filters">
        <div className="sighting__filters__location">
          <LocationSelector setSelectedLocationId={setSelectedLocationId} />
        </div>
        <div className="sighting__filters__species">
          <SpeciesSelector setSelectedSpeciesId={setSelectedSpeciesId} />
        </div>
        <div className="sighting__filters__users">
          <UsersSelector setSelectedUserId={setSelectedUserId} />
        </div>
      </section>
      <div className="paginate__wrapper">
        <ReactPaginate
          className="sighting__paginate"
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagintion__link"}
          nextLinkClassName={"pagintion__link"}
          disabledClassName={"pagintion__link--disabled"}
          activeClassName={"pagintion__link--active"}
        />
      </div>
      <ul className="list-group list-group-flush">
        {sightings.slice(offset, offset + perPage).map((s, i) => (
          <li className="sighting__list__item" key={i}>
            <div className="sighting__card">
              <h2 className="sighting__card__title">{s.species.name}</h2>
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
                <p>
                  Seen by: {s.user.name} ({s.user.username})
                </p>
                {s.approvedBy !== null ? <p>Confirmed ☑</p> : <></>}

                {isAdmin ? (
                  <div className="sighting__card__btns">
                    <button
                      className="sighting__button btn btn-primary"
                      disabled={!!s.approvedBy}
                      onClick={() => {
                        confirmWhaleSighting(s.id);
                      }}
                      type="submit"
                    >
                      Confirm
                    </button>
                    <button
                      className="sighting__button btn btn-primary"
                      onClick={() => {
                        deleteWhaleSighting(s.id);
                      }}
                      type="submit"
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <> </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="paginate__wrapper">
        <ReactPaginate
          className="sighting__paginate"
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagintion__link"}
          nextLinkClassName={"pagintion__link"}
          disabledClassName={"pagintion__link--disabled"}
          activeClassName={"pagintion__link--active"}
        />
      </div>
    </div>
  );
}
