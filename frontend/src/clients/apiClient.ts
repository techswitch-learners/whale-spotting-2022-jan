import internal from "stream";
import { NumberLiteralType } from "typescript";

export interface Species {
  id: number;
  name: string;
  latinName: string;
  photoUrl: string;
  description: string;
  endangeredStatus: string;
}

export interface Location {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  description: string;
  amenities: string[];
}

export interface NewSighting {
  date: Date;
  locationId: number;
  speciesId: number;
  description: string;
  photoUrl: string;
  userId: number;
}

function getAuthorizationHeader(username: string, password: string) {
  return `Basic ${btoa(`${username}:${password}`)}`;
}

export async function fetchSpecies(): Promise<Array<Species>> {
  const response = await fetch(`https://localhost:5001/species`);
  return await response.json();
}

export async function fetchLocations(): Promise<Array<Location>> {
  const response = await fetch(`https://localhost:5001/locations`);
  return await response.json();
}

export async function createSighting(
  newSighting: NewSighting,
  username: string,
  password: string
) {
  const response = await fetch(`https://localhost:5001/sightings/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthorizationHeader(username, password),
    },
    body: JSON.stringify(newSighting),
  });

  if (!response.ok) {
    throw new Error(await response.json());
  }
}
