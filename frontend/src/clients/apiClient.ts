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
    // body: JSON.stringify(searchTerm),
  });

  if (!response.ok) {
    throw new Error(await response.json());
  }

  return await response.json();
}
export async function fetchLocationById(): Promise<Location> {
  const response = await fetch(`https://localhost:5001/locations`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(searchTerm),
  });

  if (!response.ok) {
    throw new Error(await response.json());
  }

  return await response.json();
}
