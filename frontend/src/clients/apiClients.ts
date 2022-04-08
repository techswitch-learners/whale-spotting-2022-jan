const baseUrl = process.env["REACT_APP_BACKEND_DOMAIN"];

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
  description: string;
  name: string;
  latinName: string;
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

export interface Location {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  description: string;
  sightings: Sighting[];
  amenities: string[];
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
  approvedBy: User;
}

export interface Species {
  id: number;
  name: string;
  latinName: string;
  photoUrl: string;
  description: string;
  endangeredStatus: string;
}
export interface Whales {
  id: number;
  name: string;
  photoUrl: string;
  species: Species;
  description: string;
  users: User[];
}

export interface NewSighting {
  date: Date;
  locationId: number;
  speciesId: number;
  description: string;
  photoUrl: string;
}
export interface Interaction {
  date: Date;
  whaleId: number;
  userId: number;
}
export interface NewInteraction {
  date: Date;
  whaleId: number;
}

export interface LeaderboardEntry {
  username: string;
  count: number;
}

function getAuthorizationHeader(username: string, password: string) {
  return `Basic ${btoa(`${username}:${password}`)}`;
}

export async function GetAllSightings(): Promise<Array<Sighting>> {
  const response = await fetch(`${baseUrl}/sightings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}
export async function GetAllWhales(): Promise<Array<Whales>> {
  const response = await fetch(`https://localhost:5001/species/meetwhales`, {
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
  const response = await fetch(`${baseUrl}/login`, {
    headers: {
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
    },
  });
  if (!response.ok) {
    throw new Error(JSON.stringify(await response.json()));
  }
};

export const isAdmin = async (username: string): Promise<boolean> => {
  const response = await fetch(`${baseUrl}/users/${username}`);
  const user = await response.json();
  return user.role;
};

export async function createUser(newUser: NewUser) {
  const response = await fetch(`${baseUrl}/users/`, {
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

export async function approveSighting(
  id: number,
  username: string,
  password: string
) {
  const response = await fetch(`${baseUrl}/sightings/${id}/approve`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthorizationHeader(username, password),
    },
  });
  if (!response.ok) {
    throw new Error(await response.json());
  }
}

export async function deleteSighting(
  id: number,
  username: string,
  password: string
) {
  const response = await fetch(`${baseUrl}/sightings/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthorizationHeader(username, password),
    },
  });
  if (!response.ok) {
    throw new Error(await response.json());
  }
}

export const getMostRecentSighting = async () => {
  const response = await fetch(`${baseUrl}/sightings/recent`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(await response.json());
  }
  return data;
};

export async function fetchLocations(): Promise<Array<Location>> {
  const response = await fetch(`${baseUrl}/locations`, {
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

export async function fetchLocationById(locationId: number): Promise<Location> {
  const response = await fetch(`${baseUrl}/locations/${locationId}`, {
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

export async function fetchSpecies(): Promise<Array<Species>> {
  const response = await fetch(`${baseUrl}/species`);
  return await response.json();
}

export async function createSighting(
  newSighting: NewSighting,
  username: string,
  password: string
) {
  const response = await fetch(`${baseUrl}/sightings/create`, {
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
export async function createInteraction(
  newInteraction: NewInteraction,
  username: string,
  password: string
) {
  const response = await fetch(`https://localhost:5001/interactions/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthorizationHeader(username, password),
    },
    body: JSON.stringify(newInteraction),
  });

  if (!response.ok) {
    throw new Error(await response.json());
  }
}

export const getPopularLocations = async () => {
  const response = await fetch(`${baseUrl}/locations/popular`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(await response.json());
  }
  return data;
};

export const getLeaderboard = async () => {
  const response = await fetch(`${baseUrl}/leaderboard`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(await response.json());
  }
  return data;
};
