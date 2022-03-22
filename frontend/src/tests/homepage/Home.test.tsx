import { render, screen } from "@testing-library/react";
import { Home } from "../../components/homepage/Home";

test("renders whale spotting text to screen", () => {
  render(<Home />);
  const elements = screen.getAllByText(/whale spotting/i);
  expect(elements[0]).toBeInTheDocument();
});
