import { fetchSightingList } from "../../api/apiClient";
import fetchMock, { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();
beforeEach(fetchMock.resetMocks);

const baseUrl = process.env["REACT_APP_BACKEND_DOMAIN"];

const internalSightingList = {
  sightings: [
    {
      id: 1,
      status: 1,
      date: "11/12/2005",
      location: {
        id: 1,
        latitude: "2.5",
        longitude: "3.7",
        sightings: [],
      },
    },
  ],
};
const externalSightingList = {
  sightings: [
    {
      id: 1,
      status: 1,
      date: "30/07/2020",
      location: {
        id: 1,
        latitude: "90",
        longitude: "0",
        sightings: [],
      },
    },
  ],
};
const expectedCombinedList = [
  {
    id: 1,
    status: 1,
    date: "11/12/2005",
    location: {
      id: 1,
      latitude: "2.5",
      longitude: "3.7",
      sightings: [],
    },
  },
  {
    id: 1,
    status: 1,
    date: "30/07/2020",
    location: {
      id: 1,
      latitude: "90",
      longitude: "0",
      sightings: [],
    },
  },
];
const jsonInputInternal = JSON.stringify(internalSightingList);
const jsonInputExternal = JSON.stringify(externalSightingList);

const callCombinedFetch = async () => {
  fetchMock.mockResponseOnce(jsonInputInternal, { status: 200 });
  fetchMock.mockResponseOnce(jsonInputExternal, { status: 200 });
  return await fetchSightingList();
};

describe("fetchSightingList: ", () => {
  test("returns the same combined list of sightings as returned from the fetch", async () => {
    const sightings = await callCombinedFetch();
    expect(sightings.sightings).toEqual(expectedCombinedList);
  });
});
