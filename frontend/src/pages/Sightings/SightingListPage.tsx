import { useContext, useEffect, useState } from "react";
import "./SightingListPage.scss";
import {
  approveSighting,
  deleteSighting,
  Sighting,
} from "../../clients/apiClients";
import { GetAllSightings } from "../../clients/apiClients";
import ReactPaginate from "react-paginate";
import { LoginContext } from "../../components/login/LoginManager";
import { parseJSON } from "date-fns";

export function SightingListPage(): JSX.Element {
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 2;
  const [sightings, setSightings] = useState<Array<Sighting>>([]);
  const { username, password, isAdmin } = useContext(LoginContext);

  useEffect(() => {
    GetAllSightings().then(setSightings);
  }, []);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const offset = currentPage * perPage;

  const pageCount = Math.ceil(sightings.length / perPage);

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

  return (
    <div className="sighting__list__body">
      <h1 className="sighting__list__title">Sightings</h1>
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
