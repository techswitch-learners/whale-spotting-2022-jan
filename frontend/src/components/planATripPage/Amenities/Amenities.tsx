import React, { useEffect, useState } from "react";
import { fetchLocationById } from "../../../clients/apiClients";

export function Amenities({ locationId }: { locationId: number }): JSX.Element {
  const [amenities, setAmenities] = useState<Array<string>>();

  useEffect(() => {
    fetchLocationById(locationId).then((response) => {
      setAmenities(response[0].amenities);
    });
  }, [locationId]);

  if (amenities === undefined) {
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
