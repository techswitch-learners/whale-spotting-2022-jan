import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders whale spotting text to screen", () => {
  render(<App />);
  const elements = screen.getAllByText(/whale spotting/i);
  expect(elements[0]).toBeInTheDocument();
});
