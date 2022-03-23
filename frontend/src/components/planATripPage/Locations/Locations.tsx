import react from "react";
import { getLocations } from "../../../clients/locationClient";

import Select from 'react-select';

export function Locations() {

  const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
  return (
    <section className="get-location">
      <h1>Where do you want go Whale spotting?</h1>
      <Select options={options} />
   
    </section>
  );
}



