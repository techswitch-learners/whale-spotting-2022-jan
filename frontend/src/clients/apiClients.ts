const baseUrl = process.env["REACT_APP_BACKEND_DOMAIN"];

export interface User {
  id: number;
  name: string;
  username: string;
  role: number;
}

export interface UserRoleType {
  roles: number[];
}

export interface NewUser {
  name: string;
  username: string;
  email: string;
  password: string;
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

export interface EndangeredStatus {
  id: number;
  name: string;
  description: string;
}

export interface Species {
  id: number;
  name: string;
  latinName: string;
  photoUrl: string;
  description: string;
  endangeredStatus: EndangeredStatus;
}

export interface UpdateSpecies {
  name: string;
  latinName: string;
  photoUrl: string;
  description: string;
  endangeredStatusId: number;
}

export interface NewSighting {
  date: Date;
  locationId: number;
  speciesId: number;
  description: string;
  photoUrl: string;
}

export interface ExternalSighting {
  id: number;
  date: Date;
  location: Location;
  description: string;
  species: Species[];
  photoUrl: string;
  email: string;
}

export interface NewSpecies {
  name: string;
  latinName: string;
  photoUrl: string;
  description: string;
  endangeredStatusId: number;
}

export interface UpdateUser {
  role: number;
  userId: number;
}

export interface LeaderboardEntry {
  username: string;
  count: number;
}

function getAuthorizationHeader(username: string, password: string) {
  return `Basic ${btoa(`${username}:${password}`)}`;
}

export async function getAllSightings(
  locationId: number,
  speciesId: number,
  createdByUserId: number
): Promise<Array<Sighting>> {
  const extraQueries = locationId || speciesId || createdByUserId ? `?` : "";
  const query = locationId ? `locationId=${locationId}&` : "";
  const query2 = speciesId ? `speciesId=${speciesId}&` : "";
  const query3 = createdByUserId ? `createdByUserId=${createdByUserId}&` : "";
  const response = await fetch(
    `${baseUrl}/sightings${extraQueries}${query}${query2}${query3}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return await response.json();
}

export async function getExternalSightings(): Promise<Array<ExternalSighting>> {
  const response = await fetch(
    `https://whale-spotting-external-api.herokuapp.com/api/sightings`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const sightingsArray = await response.json();
  return sightingsArray.sightings;
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

export async function fetchSpeciesById(
  speciesId: number
): Promise<UpdateSpecies> {
  const response = await fetch(`${baseUrl}/species/${speciesId}`);
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

export const getPopularLocations = async () => {
  const response = await fetch(`${baseUrl}/locations/popular`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(await response.json());
  }
  return data;
};

export async function fetchUsers(): Promise<Array<User>> {
  const response = await fetch(`${baseUrl}/users`);
  return await response.json();
}

export const getLeaderboard = async () => {
  const response = await fetch(`${baseUrl}/leaderboard`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(await response.json());
  }
  return data;
};

export async function fetchEndangeredStatus(): Promise<
  Array<EndangeredStatus>
> {
  const response = await fetch(`${baseUrl}/endangered`);
  return await response.json();
}

export async function createSpecies(
  newSpecies: NewSpecies,
  username: string,
  password: string
) {
  const response = await fetch(`${baseUrl}/species/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthorizationHeader(username, password),
    },
    body: JSON.stringify(newSpecies),
  });
  if (!response.ok) {
    throw new Error(await response.json());
  }
}

export async function updateSpecies(
  id: number,
  updatedSpecies: UpdateSpecies,
  username: string,
  password: string
) {
  const response = await fetch(`${baseUrl}/species/${id}/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthorizationHeader(username, password),
    },
    body: JSON.stringify(updatedSpecies),
  });

  if (!response.ok) {
    throw new Error(await response.json());
  }
}

export async function deleteSpecies(
  id: number,
  username: string,
  password: string
) {
  const response = await fetch(`${baseUrl}/species/${id}`, {
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

export async function addAdmin(
  update: UpdateUser,
  username: string,
  password: string
) {
  const response = await fetch(`https://localhost:5001/users/update/role`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthorizationHeader(username, password),
    },
    body: JSON.stringify(update),
  });

  if (!response.ok) {
    throw new Error(await response.json());
  }
}

export async function fetchAllUsers(): Promise<Array<User>> {
  const response = await fetch(`https://localhost:5001/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}

export async function fetchUserRoleType(): Promise<Array<UserRoleType>> {
  const response = await fetch(`https://localhost:5001/users/roles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}
