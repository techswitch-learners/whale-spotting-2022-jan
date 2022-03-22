import { render, screen } from "@testing-library/react";
import { SightingCard } from "../../components/sightingCard/SightingCard";

const sighting = {
  id: 1,
  status: 0,
  date: "20-10-2021",
  location: {
    id: 1,
    latitude: "23.0",
    longitude: "-10.0",
    sightings: [],
  },
};

describe("SightingCard: ", () => {
  beforeEach(async () => {
    render(<SightingCard key={sighting.id} sighting={sighting} />);
  });

  test("displays sighting card image", () => {
    const sightingCardImg = screen.getByRole("img");
    expect(sightingCardImg).toBeInTheDocument();
  });

  test("displays the text 'Location'", () => {
    const sightingCardLocation = screen.getByText(/location/i, {
      exact: false,
    });
    expect(sightingCardLocation).toBeInTheDocument();
  });
});
