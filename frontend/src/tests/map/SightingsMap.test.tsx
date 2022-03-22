import { act, fireEvent, render, screen } from "@testing-library/react";
import { SightingsMap } from "../../components/map/SightingsMap";
import { fetchSightingList, SightingListResponse } from "../../api/apiClient";
import "react-leaflet";

const MapButton = ({ children, eventHandlers }: any) => (
  <button data-testid="marker" onClick={eventHandlers.click}>
    {children}
  </button>
);

jest.mock("react-leaflet", () => ({
  MapContainer: (props: any) => <div data-testid="map-container" {...props} />,
  TileLayer: (props: any) => <div data-testid="tile" {...props} />,
  CircleMarker: (props: any) => <MapButton {...props} />,
  Popup: (props: any) => <div data-testid="popup" {...props} />,
  useMap: () => ({ setView: jest.fn(), getZoom: jest.fn() }),
}));

jest.mock("../../api/apiClient", () => ({
  fetchSightingList: jest.fn(
    () =>
      new Promise<SightingListResponse>((resolve) =>
        resolve({ sightings: [sighting, { ...sighting, id: sighting.id++ }] })
      )
  ),
}));

const sighting = {
  id: 1,
  status: 1,
  date: "11/12/2005",
  location: {
    id: 1,
    latitude: "2",
    longitude: "3",
    sightings: [],
  },
};

beforeEach(async () => {
  jest.clearAllMocks();
  await act(async () => {
    render(<SightingsMap />);
  });
});

describe("SightingsMap: ", () => {
  test("initially centers on TechSwitch location", async () => {
    expect(screen.getByTestId("map-container")).toHaveAttribute(
      "center",
      "51.553968,-0.144704"
    );
  });

  test("calls fetchSightingList exactly once", async () => {
    expect(fetchSightingList).toHaveBeenCalledTimes(1);
  });

  test("has the same number of markers as sightings returned from fetch", async () => {
    expect(screen.getAllByTestId("marker").length).toBe(2);
  });

  test("centers on sighting location on marker click with vertical offset", () => {
    const marker = screen.getAllByTestId("marker")[0];
    fireEvent.click(marker);
    expect(screen.getByTestId("map-container")).toHaveAttribute(
      "center",
      `${parseInt(sighting.location.latitude) + 10},${
        sighting.location.longitude
      }`
    );
  });
});
