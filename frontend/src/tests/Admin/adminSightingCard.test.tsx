import { render, screen } from "@testing-library/react";
import { AdminSightingCard } from "../../components/AdminSighting/AdminSightingCard";

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

describe("AdminSightingCard: ", () => {
  beforeEach(async () => {
    render(<AdminSightingCard key={sighting.id} sighting={sighting} />);
  });

  test("displays admin sighting card image", () => {
    const AdminSightingCardImg = screen.getByRole("img");
    expect(AdminSightingCardImg).toBeInTheDocument();
  });

  test("displays the text 'Species Sighted'", () => {
    const sightingCardLocation = screen.getByText(/Species Sighted/i, {
      exact: false,
    });
    expect(sightingCardLocation).toBeInTheDocument();
  });

  test("displays admin sighting card 'Approve Sighting' and 'Delete Sighting' button", () => {
    const AdminSightingCardButton = screen.getAllByRole("button");
    expect(AdminSightingCardButton[0]).toBeInTheDocument();
    expect(AdminSightingCardButton[1]).toBeInTheDocument();
  });
});
