import { useContext } from "react";
import { LoginContext } from "../components/login/LoginManager";

export interface SpeciesResponse {
  id: number;
  name: string;
  photoUrl: string;
}

export interface SpeciesListResponse {
  species: SpeciesResponse[];
}

export interface Sighting {
  id: number;
  status: number;
  date: string;
  location: Location;
  species?: Species[];
  photoUrl?: string;
  email?: string;
}

export interface Species {
  id: number;
  name: string;
  latinName?: string;
  photoUrl?: string;
  description?: string;
  endangeredStatus: string;
  sightings?: Sighting[] | null;
}

export interface Location {
  id: number;
  latitude: string;
  longitude: string;
  name?: string;
  description?: string;
  sightings?: Sighting[];
}

export interface SightingListResponse {
  sightings: Sighting[];
}

export interface NewSighting {
  date: Date;
  speciesId: number;
  longitude: string;
  latitude: string;
  imageUrl: string;
  email: string;
}

export interface UserDetail {
  name: string;
  username: string;
  password: string;
}

export interface Destination {
  id: number;
  name: string;
  photoUrl: string;
}

export interface Trip {
  destination: Destination;
  species: Species[];
  month: number;
}

export interface TripListResponse {
  trips: Trip[];
}

export interface SpeciesMonth {
  species: string;
  months: number[];
}

export interface DestinationResponse {
  name: string;
  photoUrl: string;
  speciesMonths: SpeciesMonth[];
}

export interface DestinationListResponse {
  destinations: Destination[];
}

const baseUrl = process.env["REACT_APP_BACKEND_DOMAIN"];

export const fetchSpeciesList = async (): Promise<SpeciesListResponse> => {
  const response = await fetch(`${baseUrl}/species`);
  return await response.json();
};

export const fetchInternalSightingList =
  async (): Promise<SightingListResponse> => {
    const response = await fetch(`${baseUrl}/sightings`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  };

export const fetchExternalSightingList =
  async (): Promise<SightingListResponse> => {
    const response = await fetch(
      `https://whale-spotting-external-api.herokuapp.com/api/sightings`
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  };

export const fetchSightingList = async (): Promise<SightingListResponse> => {
  const internalApi = await fetchInternalSightingList();
  const externalApi = await fetchExternalSightingList();

  const sightingsList = internalApi.sightings.concat(externalApi.sightings);

  return { sightings: sightingsList };
};

export const fetchTripsByMonth = async (
  monthId: number
): Promise<TripListResponse> => {
  const response = await fetch(`${baseUrl}/planner/month?monthId=${monthId}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

export const fetchDestination = async (
  destinationId: number
): Promise<DestinationResponse> => {
  const response = await fetch(
    `${baseUrl}/planner/destinations/${destinationId}`
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

export const fetchAllDestinations =
  async (): Promise<DestinationListResponse> => {
    const response = await fetch(`${baseUrl}/planner/destinations`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  };

export const createSighting = async (newSighting: NewSighting) => {
  const response = await fetch(`${baseUrl}/sightings/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSighting),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

function useBasicAuthFetch() {
  const loginContext = useContext(LoginContext);

  async function fetchWithBasicAuth(url: string, init?: any) {
    const initWithAuthHeader = {
      ...init,
      headers: {
        ...init?.headers,
        Authorization: `Basic ${btoa(
          `${loginContext.username}:${loginContext.password}`
        )}`,
      },
    };

    const response = await fetch(url, initWithAuthHeader);

    if (response.status === 401) {
      loginContext.logOut();
    }

    return response;
  }

  return fetchWithBasicAuth;
}

export function useWhaleSpottingApiFunctions() {
  const fetchWithBasicAuth = useBasicAuthFetch();

  const fetchAdminSightingList = async (): Promise<SightingListResponse> => {
    const response = await fetchWithBasicAuth(`${baseUrl}/admin`);
    return await response.json();
  };

  const confirmSighting = async (sightingId: number) => {
    const response = await fetchWithBasicAuth(
      `${baseUrl}/admin/confirm/${sightingId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw Error("Unexpected Error");
    }
  };

  const deleteSighting = async (sightingId: number) => {
    const response = await fetchWithBasicAuth(
      `${baseUrl}/admin/delete/${sightingId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw Error("Unexpected Error");
    }
  };

  return {
    fetchAdminSightingList,
    confirmSighting,
    deleteSighting,
  };
}

export const loginUser = async (username: string, password: string) => {
  const response = await fetch(`${baseUrl}/login`, {
    method: "GET",
    headers: {
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
    },
  });
  if (!response.ok && response.status === 401) {
    throw Error("Invalid Email and Password");
  } else if (!response.ok && response.status === 400) {
    throw Error("Invalid Request");
  } else if (!response.ok) {
    throw Error("Unexpected Error");
  }
  const content = await response;
  console.log(content);
  return content;
};

export async function CreateUser(userdetails: UserDetail) {
  const response = await fetch(`${baseUrl}/login/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userdetails),
  });

  if (!response.ok) {
    throw new Error(await response.json());
  }
}
