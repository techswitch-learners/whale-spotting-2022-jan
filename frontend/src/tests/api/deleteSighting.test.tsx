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
const sightingId = 3;
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

const callWithNoContentResponse = async () => {
  const wrapper: React.FunctionComponent = ({ children }) => (
    <LoginContext.Provider value={Logincontext}>
      {children}
    </LoginContext.Provider>
  );
  const { deleteSighting } = renderHook(() => useWhaleSpottingApiFunctions(), {
    wrapper,
  }).result.all[0] as UseWhaleSpottingApiFunctionsReturn;
  fetchMock.mockResponseOnce("", { status: 204 });
  return await deleteSighting(sightingId);
};

describe("deleteSighting: ", () => {
  test("makes exactly one fetch request", async () => {
    await callWithNoContentResponse();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test("sends the DELETE request to the backend's 'delete' endpoint", async () => {
    await callWithNoContentResponse();
    expect(global.fetch).toBeCalledWith(
      `${baseUrl}/admin/delete/${sightingId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Basic YWJjOmFiYw==",
          "Content-Type": "application/json",
        },
      }
    );
  });
});