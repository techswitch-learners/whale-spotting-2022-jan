const locationList = [
  ``,

];

export function getLocations() {
  const selection = Math.floor(Math.random() * locationList.length);

  return locationList[selection];
}
