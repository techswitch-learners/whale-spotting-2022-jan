import { type } from "os";
import React, { useContext, useEffect, useState } from "react";
import "./SightingListPage.scss";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

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
  id: number;
  date: Date;
  location: Location;
  description: string;
  species: Species;
  photoUrl: string;
  user: User;
}

export async function fetchSightings(): Promise<Array<Sighting>> {
  return Promise.resolve([
    {
      id: 1,
      date: new Date(),
      description:
        "The blue whale (Balaenoptera musculus) is a marine mammal and a baleen whale. Reaching a maximum confirmed length of 29.9 meters (98 ft) and weighing up to 199 metric tons (196 long tons; 219 short tons), it is the largest animal known to have ever existed. The blue whale's long and slender body can be of various shades of greyish-blue dorsally and somewhat lighter underneath.",
      species: { name: "Blue Whale", latinName: "Balaenoptera musculus" },
      location: { name: "Cardiff" },
      photoUrl:
        "https://cdn.britannica.com/37/75637-050-B425E8F1/Killer-whale.jpg",
      user: { name: "Ija", username: "IjaSap" },
    },
    {
      id: 2,
      date: new Date(),
      description:
        "The humpback whale (Megaptera novaeangliae) is a species of baleen whale. It is a rorqual; a member of the family Balaenopteridae. Adults range in length from 14–17 m (46–56 ft) and weighing up to 40 metric tons (44 short tons). The humpback has a distinctive body shape, with long pectoral fins and a knobbly head. It is known for breaching and other distinctive surface behaviors, making it popular with whale watchers. Males produce a complex song typically lasting 4 to 33 minutes.",
      species: { name: "Humpback Whale", latinName: "Megaptera novaeangliae" },
      location: { name: "Edinburg" },
      photoUrl:
        "https://static.independent.co.uk/2022/02/06/08/newFile.jpg?quality=75&width=982&height=726&auto=webp",
      user: { name: "Zuhal", username: "ZuhKur" },
    },
    {
      id: 3,
      date: new Date(),
      description:
        "The beluga whale (Delphinapterus leucas) is an Arctic and sub-Arctic cetacean. It is one of two members of the family Monodontidae, along with the narwhal, and the only member of the genus Delphinapterus. It is also known as the white whale, as it is the only cetacean to regularly occur with this colour; the sea canary, due to its high-pitched calls; and the melonhead, though that more commonly refers to the melon-headed whale, which is an oceanic dolphin.",
      species: { name: "Beluga Whale", latinName: "Delphinapterus leucas" },
      location: { name: "Edinburg" },
      photoUrl:
        "https://i.natgeofe.com/n/a7928401-ba65-4d1a-a1fb-138621d18c13/3636516_3x2.jpg",
      user: { name: "Zuhal", username: "ZuhKur" },
    },
    {
      id: 4,
      date: new Date(),
      description:
        "The blue whale (Balaenoptera musculus) is a marine mammal and a baleen whale. Reaching a maximum confirmed length of 29.9 meters (98 ft) and weighing up to 199 metric tons (196 long tons; 219 short tons), it is the largest animal known to have ever existed. The blue whale's long and slender body can be of various shades of greyish-blue dorsally and somewhat lighter underneath.",
      species: { name: "Blue Whale", latinName: "Balaenoptera musculus" },
      location: { name: "Cardiff" },
      photoUrl:
        "https://cdn.britannica.com/37/75637-050-B425E8F1/Killer-whale.jpg",
      user: { name: "Ija", username: "IjaSap" },
    },
    {
      id: 5,
      date: new Date(),
      description:
        "The blue whale (Balaenoptera musculus) is a marine mammal and a baleen whale. Reaching a maximum confirmed length of 29.9 meters (98 ft) and weighing up to 199 metric tons (196 long tons; 219 short tons), it is the largest animal known to have ever existed. The blue whale's long and slender body can be of various shades of greyish-blue dorsally and somewhat lighter underneath.",
      species: { name: "Blue Whale", latinName: "Balaenoptera musculus" },
      location: { name: "Cardiff" },
      photoUrl:
        "https://cdn.britannica.com/37/75637-050-B425E8F1/Killer-whale.jpg",
      user: { name: "Ija", username: "IjaSap" },
    },
    {
      id: 6,
      date: new Date(),
      description:
        "The blue whale (Balaenoptera musculus) is a marine mammal and a baleen whale. Reaching a maximum confirmed length of 29.9 meters (98 ft) and weighing up to 199 metric tons (196 long tons; 219 short tons), it is the largest animal known to have ever existed. The blue whale's long and slender body can be of various shades of greyish-blue dorsally and somewhat lighter underneath.",
      species: { name: "Blue Whale", latinName: "Balaenoptera musculus" },
      location: { name: "Cardiff" },
      photoUrl:
        "https://cdn.britannica.com/37/75637-050-B425E8F1/Killer-whale.jpg",
      user: { name: "Ija", username: "IjaSap" },
    },
  ]);
}

export function SightingListPage(): JSX.Element {
  const [sightings, setSightings] = useState<Array<Sighting>>([]);
  console.log("inside SightingListPage");
  useEffect(() => {
    fetchSightings().then(setSightings);
  }, []);

  const [isOpen, setIsOpen] = React.useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <h1 className="title">Sightings</h1>
      <ul className="sighting_list">
        {sightings.map((s, i) => (
          <li className="sighting_list_item" key={i}>
            <div className="sighting">
              <h2>
                {s.species.name} ({s.species.latinName})
              </h2>

              <button onClick={showModal}>
                <img
                  src={s.photoUrl}
                  alt={s.description}
                  width="200"
                  height="100"
                />
              </button>

              <div className="sighting_info">
                <p>About sighting: {s.description}</p>
                <p>Sighting Location: {s.location.name}</p>
                <p>On: {s.date.toDateString()}</p>
                <p>
                  Seen by: {s.user.name} ({s.user.username})
                </p>
              </div>
            </div>

            <Modal show={isOpen} onHide={hideModal}>
              <Modal.Body>
                <img
                  src={s.photoUrl}
                  alt={s.description}
                  width="200"
                  height="100"
                />
              </Modal.Body>

              <Modal.Footer>
                <button onClick={hideModal}>Cancel</button>
              </Modal.Footer>
            </Modal>
          </li>
        ))}
      </ul>
    </>
  );
}
