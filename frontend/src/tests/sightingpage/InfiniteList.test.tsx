import { act, render, screen, fireEvent } from "@testing-library/react";
import { SightingListResponse, Sighting } from "../../api/apiClient";
import { InfiniteList } from "../../components/InfiniteList/InfiniteList";

const sighting = {
  id: 1,
  status: 1,
  date: "11/12/2005",
  location: {
    id: 1,
    latitude: "2.5",
    longitude: "3.7",
    sightings: [],
  },
};

const mockFetchItems = (items: Sighting[]) =>
  jest.fn(
    () =>
      new Promise<SightingListResponse>((resolve) =>
        resolve({ sightings: items })
      )
  );

const renderInfiniteList = (items: Sighting[]) => {
  render(
    <InfiniteList
      fetchItems={mockFetchItems(items)}
      renderItem={(item) => <div key={item.id}>item.id</div>}
    />
  );
};

describe("InfiniteList: ", () => {
  test("gracefully informs user when there are no items to display", async () => {
    await act(async () => {
      renderInfiniteList([]);
    });
    expect(screen.getByText(/No sightings to display/i)).toBeInTheDocument();
  });

  test("displays the same number of items as the array passed to it when the array has less than ten items", async () => {
    await act(async () => {
      renderInfiniteList(Array(4).fill(sighting));
    });
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });

  test("'Load More' button loads more items on click", async () => {
    await act(async () => {
      renderInfiniteList(Array(13).fill(sighting));
    });

    expect(screen.getAllByRole("listitem")).toHaveLength(10);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getAllByRole("listitem")).toHaveLength(13);
  });

  test("'Load More' button not available when all cards displayed", async () => {
    await act(async () => {
      renderInfiniteList(Array(10).fill(sighting));
    });
    expect(screen.queryByText(/load more/i)).toBeNull();
  });
});
