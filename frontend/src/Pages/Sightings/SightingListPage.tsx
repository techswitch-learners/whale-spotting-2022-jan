import { type } from "os";
import React, { useContext, useEffect, useState } from "react";

export interface Species {
  name: string;
  latinName: string;
}

export interface Location {
  name: string;
}

export interface User {
  name: string;
  username: string;
}

export interface Sighting {
  date: Date;
  location: Location;
  description: string;
  species: Species;
  photoUrl: string;
  user: User;
}

export async function fetchSightings(): Promise<Array<Sighting>> {
  // const response = await fetch(`https://localhost:5001/sightings`,  {
  //     method: "GET",
  //     headers: {
  //         "Content-Type": "application/json"
  //     }
  // });
  // return await response.json();
  return Promise.resolve([
    {
      date: new Date(),
      description: "Sighting 1",
      species: { name: "aaa", latinName: "bbb" },
      location: { name: "Cardiff" },
      photoUrl:
        "https://cdn.britannica.com/37/75637-050-B425E8F1/Killer-whale.jpg",
      user: { name: "Ija", username: "IjaSab" },
    },
    {
      date: new Date(),
      description: "Sighting 2",
      species: { name: "aaa", latinName: "bbb" },
      location: { name: "Edinburg" },
      photoUrl:
        "https://static.independent.co.uk/2022/02/06/08/newFile.jpg?quality=75&width=982&height=726&auto=webp",
      user: { name: "Zuhal", username: "ZuhKur" },
    },
  ]);
}

export function SightingListPage(): JSX.Element {
  const [sightings, setSightings] = useState<Array<Sighting>>([]);
  console.log("inside SightingListPage");
  useEffect(() => {
    fetchSightings().then(setSightings);
  }, []);

  return (
    <>
      <h1 className="title">Sightings</h1>
      <ul>
        {sightings.map((s, i) => (
          <li key={i}>
            <h2>{s.description}</h2>
            <p>
              Species: {s.species.name} ({s.species.latinName})
            </p>
            <p>Sighting Location: {s.location.name}</p>
            <p>On: {s.date.toDateString()}</p>
            <img src={s.photoUrl} width="200" />
            <p>
              Seen by: {s.user.name} ({s.user.username})
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
