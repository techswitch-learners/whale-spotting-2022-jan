import { render, screen, waitFor } from "@testing-library/react";
import { CreateSightingForm } from "../../components/create-sighting/CreateSighting";
import userEvent from "@testing-library/user-event";

describe("<CreateSightingForm />", () => {
  beforeEach(async () => {
    render(<CreateSightingForm />);
  });

  test("displays the date form field 'Date'", () => {
    const DateLabel = screen.getByLabelText(/Date/i);
    expect(DateLabel).toBeInTheDocument();
    expect(DateLabel).toHaveAccessibleName();
  });

  test("displays the dropdown form field 'Species'", () => {
    const SpeciesLabel = screen.getByLabelText(/Species_List/i);
    expect(SpeciesLabel).toBeInTheDocument();
    expect(SpeciesLabel).toHaveAccessibleName();
  });

  test("displays the text form field 'Latitude'", () => {
    const LatitudeLabel = screen.getByLabelText(/Latitude/i);
    expect(LatitudeLabel).toBeInTheDocument();
    expect(LatitudeLabel).toHaveAccessibleName();
  });

  test("displays the text form field 'Longitude'", () => {
    const ImageUrlLabel = screen.getByLabelText(/Longitude/i);
    expect(ImageUrlLabel).toBeInTheDocument();
    expect(ImageUrlLabel).toHaveAccessibleName();
  });

  test("displays the text form field 'Email'", () => {
    const EmailLabel = screen.getByLabelText(/Email/i);
    expect(EmailLabel).toBeInTheDocument();
    expect(EmailLabel).toHaveAccessibleName();
  });

  test("when user inputs text it is displayed in relevant form field'", () => {
    userEvent.type(screen.getByLabelText("Latitude"), "0.51345");
    waitFor(() => {
      expect(screen.getByLabelText("Latitude")).toHaveValue("0.51345");
    });
  });
});
