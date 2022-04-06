import { useEffect, useState, useContext } from "react";
import "./MeetTheWhalesPage.scss";
import { fetchSpecies, Species } from "../../clients/apiClients";
import { LoginContext } from "../../components/login/LoginManager";
import { Link } from "react-router-dom";

export function MeetTheWhalesPage(): JSX.Element {
  const [species, setSpecies] = useState<Array<Species>>([]);
  const { username, password, isAdmin } = useContext(LoginContext);

  useEffect(() => {
    fetchSpecies().then(setSpecies);
  }, []);

  return (
    <div className="species__list__body">
      <h1 className="species__list__title">Meet the Whales!</h1>
      <ul className="list-group list-group-flush">
        {species.map((s, i) => (
          <li className="species__list__item" key={i}>
            <div className="species__card">
              <h2 className="species__card__title">
                {s.name} ({s.latinName})
              </h2>
              <figure className="species__image">
                <img
                  className="species__image"
                  src={s.photoUrl}
                  alt={s.description}
                  width="250"
                />
                <figcaption className="species__card__info--emphasis">
                  Conservation status: {s.endangeredStatus.name}
                </figcaption>
              </figure>
              <div className="species__card__info">
                <p>{s.description}</p>
              </div>
            </div>
            {isAdmin ? (
              <div className="species__card__btns">
                <Link
                  className="species__button btn btn-primary"
                  to={`/species/${s.id}/update`}
                >
                  Update
                </Link>
              </div>
            ) : (
              <> </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
