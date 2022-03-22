import { render, screen } from "@testing-library/react";
import { Home } from "../../components/homepage/Home";

test("renders whale spotting text to screen", () => {
  render(<Home />);
  const elements = screen.getAllByText(/whale spotting/i);
  expect(elements[0]).toBeInTheDocument();
});

test("home image has correct alt", () => {
  render(<Home />);
  const homeImage = screen.getByRole("img");
  expect(homeImage).toHaveAttribute("alt", "Whale showing tail");
});
