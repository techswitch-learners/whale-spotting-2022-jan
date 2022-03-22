import {
  createSighting,
  fetchInternalSightingList,
  fetchSightingList,
} from "../../api/apiClient";
import fetchMock, { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();
beforeEach(fetchMock.resetMocks);

const baseUrl = process.env["REACT_APP_BACKEND_DOMAIN"];
const sighting = {
  id: 1,
  status: 1,
  date: "11/12/2005",
  location: {
    id: 1,
    latitude: "2.5",
    longitude: "3.7",
    sightings: [],
  },
};
const returnSightings = { sightings: [sighting] };
const jsonInput = JSON.stringify(returnSightings);

const callWithOkResponse = async () => {
  fetchMock.mockResponseOnce(jsonInput, { status: 200 });
  return await fetchInternalSightingList();
};

describe("fetchInternalSightingList: ", () => {
  test("makes exactly one fetch request", async () => {
    await callWithOkResponse();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test("sends the GET request to the backend's 'sightings' endpoint", async () => {
    await callWithOkResponse();
    expect(global.fetch).toBeCalledWith(`${baseUrl}/sightings`);
  });

  test("returns the same list of sightings as returned from the fetch", async () => {
    const sightings = await callWithOkResponse();
    expect(sightings).toEqual(returnSightings);
  });

  test("throws error with Unauthorized message when fetch returns 401", async () => {
    fetchMock.mockResponseOnce(jsonInput, { status: 401 });
    await expect(() => fetchSightingList()).rejects.toThrow("Unauthorized");
  });
});
