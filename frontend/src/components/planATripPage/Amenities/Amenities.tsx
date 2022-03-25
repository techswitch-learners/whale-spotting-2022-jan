import React, { useEffect, useState } from "react";
import { fetchLocationById } from "../../../clients/apiClients";

// type Weather = {
//   temp: number;
//   description: string;
//   icon: string;
// };
//export function Amenities(locationId: number): JSX.Element {
export function Amenities({ locationId }: { locationId: number }): JSX.Element {
  const [amenities, setAmenities] = useState<Array<string>>();

  useEffect(() => {
    fetchLocationById(locationId).then((response) => {
      setAmenities(response[7].amenities);
    });
  }, [locationId]);

  if (!amenities) {
    return <section>Loading...</section>;
  }

  return (
    <section className="get-amenities">
      <h1>Amenities</h1>
      {amenities?.map((a, i) => (
        <li key={i}>{a}</li>
      ))}
    </section>
  );
}
