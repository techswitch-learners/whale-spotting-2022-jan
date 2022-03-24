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

export async function fetchSpecies(): Promise<Array<Species>> {
  const response = await fetch(`https://localhost:5001/species`);
  return await response.json();
}

export async function fetchLocations(): Promise<Array<Location>> {
  const response = await fetch(`https://localhost:5001/locations`);
  return await response.json();
}
