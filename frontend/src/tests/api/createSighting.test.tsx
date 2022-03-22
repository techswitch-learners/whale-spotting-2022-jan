import { createSighting, fetchSightingList } from "../../api/apiClient";
import fetchMock, { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();
beforeEach(fetchMock.resetMocks);

const baseUrl = process.env["REACT_APP_BACKEND_DOMAIN"];
const inputSighting = {
  date: new Date(2021, 4, 18),
  speciesId: 3,
  longitude: "6.367",
  latitude: "4.384",
  imageUrl: "thisIsAnImageURL",
  email: "fake@gmail.com",
};
const jsonInput = JSON.stringify(inputSighting);

const callWithOkResponse = async () => {
  fetchMock.mockResponseOnce(jsonInput, { status: 200 });
  return await createSighting(inputSighting);
};

describe("createSighting: ", () => {
  test("makes exactly one fetch request", async () => {
    await callWithOkResponse();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test("sends the new sighting as a POST request to the backend's 'create sightings' endpoint", async () => {
    await callWithOkResponse();
    expect(global.fetch).toBeCalledWith(`${baseUrl}/sightings/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonInput,
    });
  });

  test("returns the newly created sighting object", async () => {
    const sighting = await callWithOkResponse();
    expect(sighting).toEqual({
      ...inputSighting,
      date: inputSighting.date.toISOString(),
    });
  });

  test("throws error with Unauthorized message when fetch returns 401", async () => {
    fetchMock.mockResponseOnce(jsonInput, { status: 401 });
    await expect(() => createSighting(inputSighting)).rejects.toThrow(
      "Unauthorized"
    );
  });
});
