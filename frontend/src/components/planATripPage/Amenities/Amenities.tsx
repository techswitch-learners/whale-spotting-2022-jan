import React, { useEffect, useState } from "react";
import { fetchLocationById } from "../../../clients/apiClients";
import "./Amenities.scss";
export function Amenities({ locationId }: { locationId: number }): JSX.Element {
  const [amenities, setAmenities] = useState<Array<string>>();

  useEffect(() => {
    fetchLocationById(locationId).then((response) => {
      setAmenities(response.amenities);
    });
  }, [locationId]);

  if (amenities === undefined) {
    return <section>Loading...</section>;
  }

  return (
    <section className="plan-a-trip__amenities">
      <h2 className="plan-a-trip__sub-title">Amenities</h2>
      {amenities?.map((a, i) => (
        <li className="plan-a-trip__text" key={i}>
          {a}
        </li>
      ))}
    </section>
  );
}
