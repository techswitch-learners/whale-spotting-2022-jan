export interface User {
  id: number;
  name: string;
  username: string;
}
export interface NewUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface Species {
  name: string;
  latinName: string;
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

export async function GetAllSightings(): Promise<Array<Sighting>> {
  const response = await fetch(`https://localhost:5001/sightings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}

export const login = async (
  username: string,
  password: string
): Promise<void> => {
  const response = await fetch("https://localhost:5001/login", {
    headers: {
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
    },
  });
  if (!response.ok) {
    throw new Error(JSON.stringify(await response.json()));
  }
};

export async function createUser(newUser: NewUser) {
  const response = await fetch(`https://localhost:5001/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    throw new Error(await response.json());
  }
}

//Api for location
export type Location = {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  amenities: Array<string>;
};
export async function fetchLocations(): Promise<Array<Location>> {
  const response = await fetch(`https://localhost:5001/locations`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(await response.json());
  }
  return await response.json();
}
export async function fetchLocationById(
  locationId: number
): Promise<Array<Location>> {
  const response = await fetch(`https://localhost:5001/locations`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(await response.json());
  }
  return await response.json();
}
