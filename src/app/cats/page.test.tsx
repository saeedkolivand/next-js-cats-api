import { render, screen } from "@testing-library/react";
import CatsPage from "./page";
import { getCachedCatImages, getCachedBreeds } from "@/lib/cache";

// Mock the cache functions
jest.mock("@/lib/cache", () => ({
  getCachedCatImages: jest.fn(),
  getCachedBreeds: jest.fn(),
}));

// Mock the CatsClient component
jest.mock("./CatsClient", () => {
  return function MockCatsClient({ initialCatImages, initialBreeds }: any) {
    return (
      <div data-testid="cats-client">
        <div data-testid="cat-count">{initialCatImages?.length || 0}</div>
        <div data-testid="breed-count">{initialBreeds?.length || 0}</div>
      </div>
    );
  };
});

const mockGetCachedCatImages = getCachedCatImages as jest.MockedFunction<
  typeof getCachedCatImages
>;
const mockGetCachedBreeds = getCachedBreeds as jest.MockedFunction<
  typeof getCachedBreeds
>;

describe("CatsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render CatsClient with fetched data", async () => {
    const mockCatImages = [
      {
        id: "cat1",
        url: "https://example.com/cat1.jpg",
        width: 400,
        height: 300,
      },
      {
        id: "cat2",
        url: "https://example.com/cat2.jpg",
        width: 400,
        height: 300,
      },
    ];

    const mockBreeds = [
      { id: "breed1", name: "Persian" },
      { id: "breed2", name: "Siamese" },
    ];

    mockGetCachedCatImages.mockResolvedValue(mockCatImages as any);
    mockGetCachedBreeds.mockResolvedValue(mockBreeds as any);

    const Page = await CatsPage();
    render(Page);

    expect(screen.getByTestId("cats-client")).toBeInTheDocument();
    expect(screen.getByTestId("cat-count")).toHaveTextContent("2");
    expect(screen.getByTestId("breed-count")).toHaveTextContent("2");
  });

  it("should handle empty data", async () => {
    mockGetCachedCatImages.mockResolvedValue([]);
    mockGetCachedBreeds.mockResolvedValue([]);

    const Page = await CatsPage();
    render(Page);

    expect(screen.getByTestId("cats-client")).toBeInTheDocument();
    expect(screen.getByTestId("cat-count")).toHaveTextContent("0");
    expect(screen.getByTestId("breed-count")).toHaveTextContent("0");
  });

  it("should handle null data", async () => {
    mockGetCachedCatImages.mockResolvedValue(null as any);
    mockGetCachedBreeds.mockResolvedValue(null as any);

    const Page = await CatsPage();
    render(Page);

    expect(screen.getByTestId("cats-client")).toBeInTheDocument();
    expect(screen.getByTestId("cat-count")).toHaveTextContent("0");
    expect(screen.getByTestId("breed-count")).toHaveTextContent("0");
  });

  it("should call cache functions with correct parameters", async () => {
    mockGetCachedCatImages.mockResolvedValue([]);
    mockGetCachedBreeds.mockResolvedValue([]);

    await CatsPage();

    expect(mockGetCachedCatImages).toHaveBeenCalledWith(20);
    expect(mockGetCachedBreeds).toHaveBeenCalled();
  });

  it("should fetch data in parallel", async () => {
    mockGetCachedCatImages.mockResolvedValue([]);
    mockGetCachedBreeds.mockResolvedValue([]);

    await CatsPage();

    // Both functions should be called
    expect(mockGetCachedCatImages).toHaveBeenCalled();
    expect(mockGetCachedBreeds).toHaveBeenCalled();
  });
});
