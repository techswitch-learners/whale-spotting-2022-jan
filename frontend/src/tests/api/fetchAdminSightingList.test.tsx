import {
  useWhaleSpottingApiFunctions,
  SightingListResponse,
} from "../../api/apiClient";
import fetchMock, { enableFetchMocks } from "jest-fetch-mock";
import { renderHook } from "@testing-library/react-hooks";
import { LoginContext } from "../../components/login/LoginManager";

enableFetchMocks();
beforeEach(fetchMock.resetMocks);

type UseWhaleSpottingApiFunctionsReturn = {
  fetchAdminSightingList: () => Promise<SightingListResponse>;
  confirmSighting: (sightingId: number) => Promise<void>;
  deleteSighting: (sightingId: number) => Promise<void>;
};

const baseUrl = process.env["REACT_APP_BACKEND_DOMAIN"];
const unconfirmedSighting = {
  id: 1,
  status: 0,
  date: "11/12/2005",
  location: {
    id: 1,
    latitude: "2.5",
    longitude: "3.7",
    sightings: [],
  },
};
const returnSightings = { sightings: [unconfirmedSighting] };
const jsonInput = JSON.stringify(returnSightings);
const Logincontext = {
  isLoggedIn: true,
  isAdmin: true,
  username: "abc",
  password: "abc",
  logIn: (username: string, password: string) => {
    console.log();
  },
  logOut: () => {
    console.log();
  },
};

const callWithOkResponse = async () => {
  const wrapper: React.FunctionComponent = ({ children }) => (
    <LoginContext.Provider value={Logincontext}>
      {children}
    </LoginContext.Provider>
  );
  const { fetchAdminSightingList } = renderHook(
    () => useWhaleSpottingApiFunctions(),
    { wrapper }
  ).result.all[0] as UseWhaleSpottingApiFunctionsReturn;
  fetchMock.mockResponseOnce(jsonInput, { status: 200 });
  return await fetchAdminSightingList();
};

describe("fetchAdminSightingList: ", () => {
  test("makes exactly one fetch request", async () => {
    await callWithOkResponse();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test("sends the GET request to the backend's admin 'unconfirmed-sightings' endpoint", async () => {
    await callWithOkResponse();

    expect(global.fetch).toBeCalledWith(`${baseUrl}/admin`, {
      headers: { Authorization: "Basic YWJjOmFiYw==" },
    });
  });

  test("returns the same list of sightings as returned from the fetch", async () => {
    const sightings = await callWithOkResponse();
    expect(sightings).toEqual(returnSightings);
  });
});
