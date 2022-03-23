import React from "react";

const locationList =  [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

export function getLocations() {
  const selection = Math.floor(Math.random() * locationList.length);

  return locationList[selection];
}
