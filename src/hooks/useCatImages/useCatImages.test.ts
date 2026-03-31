import { renderHook, act } from "@testing-library/react";
import { useCatImages } from "./useCatImages";
import { getCatImages } from "@/services/catService";
import { CatImage } from "@/services/catService";

// Mock the service
jest.mock("@/services/catService");

const mockGetCatImages = getCatImages as jest.MockedFunction<
  typeof getCatImages
>;

// Mock console methods to avoid noise in tests
const mockConsoleLog = jest.spyOn(console, "log").mockImplementation();
const mockConsoleError = jest.spyOn(console, "error").mockImplementation();

describe("useCatImages", () => {
  const mockInitialImages: CatImage[] = [
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

  const mockFullPageImages: CatImage[] = Array.from({ length: 20 }, (_, i) => ({
    id: `cat${i + 1}`,
    url: `https://example.com/cat${i + 1}.jpg`,
    width: 400,
    height: 300,
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
    mockConsoleError.mockRestore();
  });

  it("should initialize with initial images", () => {
    const { result } = renderHook(() =>
      useCatImages({ initialImages: mockInitialImages }),
    );

    expect(result.current.catImages).toEqual(mockInitialImages);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("");
    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(1);
    expect(result.current.hasMore).toBe(false);
  });

  it("should initialize with full page of images", () => {
    const { result } = renderHook(() =>
      useCatImages({ initialImages: mockFullPageImages }),
    );

    expect(result.current.catImages).toEqual(mockFullPageImages);
    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(2);
    expect(result.current.hasMore).toBe(true);
  });

  it("should initialize with selected breed", () => {
    const { result } = renderHook(() =>
      useCatImages({
        initialImages: mockInitialImages,
        selectedBreed: "persian",
      }),
    );

    expect(result.current.catImages).toEqual(mockInitialImages);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("");
  });

  it("should load cat images successfully", async () => {
    const newImages: CatImage[] = [
      {
        id: "cat3",
        url: "https://example.com/cat3.jpg",
        width: 400,
        height: 300,
      },
    ];

    mockGetCatImages.mockResolvedValue(newImages);

    const { result } = renderHook(() =>
      useCatImages({ initialImages: mockInitialImages }),
    );

    await act(async () => {
      await result.current.loadCatImages(2);
    });

    expect(result.current.catImages).toEqual(newImages);
    expect(result.current.currentPage).toBe(2);
    expect(result.current.totalPages).toBe(2);
    expect(result.current.hasMore).toBe(false);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("");
  });

  it("should load cat images with full page", async () => {
    mockGetCatImages.mockResolvedValue(mockFullPageImages);

    const { result } = renderHook(() =>
      useCatImages({ initialImages: mockInitialImages }),
    );

    await act(async () => {
      await result.current.loadCatImages(2);
    });

    expect(result.current.catImages).toEqual(mockFullPageImages);
    expect(result.current.currentPage).toBe(2);
    expect(result.current.totalPages).toBe(3);
    expect(result.current.hasMore).toBe(true);
  });

  it("should use selected breed when no breedId provided", async () => {
    const breedImages: CatImage[] = [
      {
        id: "breed-cat1",
        url: "https://example.com/breed-cat1.jpg",
        width: 400,
        height: 300,
      },
    ];

    mockGetCatImages.mockResolvedValue(breedImages);

    const { result } = renderHook(() =>
      useCatImages({
        initialImages: mockInitialImages,
        selectedBreed: "persian",
      }),
    );

    await act(async () => {
      await result.current.loadCatImages(2);
    });

    expect(mockGetCatImages).toHaveBeenCalledWith(
      20,
      "persian",
      undefined,
      1, // page - 1
    );
  });

  it("should use breedId parameter when provided", async () => {
    const breedImages: CatImage[] = [
      {
        id: "siamese-cat1",
        url: "https://example.com/siamese-cat1.jpg",
        width: 400,
        height: 300,
      },
    ];

    mockGetCatImages.mockResolvedValue(breedImages);

    const { result } = renderHook(() =>
      useCatImages({
        initialImages: mockInitialImages,
        selectedBreed: "persian",
      }),
    );

    await act(async () => {
      await result.current.loadCatImages(2, "siamese");
    });

    expect(mockGetCatImages).toHaveBeenCalledWith(
      20,
      "siamese",
      undefined,
      1, // page - 1
    );
  });

  it("should handle loading state", async () => {
    mockGetCatImages.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(mockInitialImages), 100),
        ),
    );

    const { result } = renderHook(() =>
      useCatImages({ initialImages: mockInitialImages }),
    );

    act(() => {
      result.current.loadCatImages(2);
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe("");

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 150));
    });

    expect(result.current.loading).toBe(false);
  });

  it("should handle error state", async () => {
    const errorMessage = "API Error";
    mockGetCatImages.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() =>
      useCatImages({ initialImages: mockInitialImages }),
    );

    await act(async () => {
      await result.current.loadCatImages(2);
    });

    expect(result.current.catImages).toEqual(mockInitialImages); // Should keep previous images
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("Failed to load cat images");
  });

  it("should reset to initial images", async () => {
    const newImages: CatImage[] = [
      {
        id: "cat3",
        url: "https://example.com/cat3.jpg",
        width: 400,
        height: 300,
      },
    ];

    mockGetCatImages.mockResolvedValue(newImages);

    const { result } = renderHook(() =>
      useCatImages({ initialImages: mockInitialImages }),
    );

    // Load new images first
    await act(async () => {
      await result.current.loadCatImages(2);
    });

    expect(result.current.catImages).toEqual(newImages);
    expect(result.current.currentPage).toBe(2);

    // Reset to initial
    await act(async () => {
      await result.current.loadCatImages(1, undefined, true);
    });

    expect(result.current.catImages).toEqual(mockInitialImages);
    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(1);
    expect(result.current.hasMore).toBe(false);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("");
  });

  it("should reset filters", async () => {
    const breedImages: CatImage[] = [
      {
        id: "breed-cat1",
        url: "https://example.com/breed-cat1.jpg",
        width: 400,
        height: 300,
      },
    ];

    mockGetCatImages.mockResolvedValue(breedImages);

    const { result } = renderHook(() =>
      useCatImages({
        initialImages: mockInitialImages,
        selectedBreed: "persian",
      }),
    );

    // Load breed images first
    await act(async () => {
      await result.current.loadCatImages(2, "siamese");
    });

    expect(result.current.catImages).toEqual(breedImages);
    expect(result.current.currentPage).toBe(2);

    // Reset filters
    await act(async () => {
      result.current.resetFilters();
    });

    expect(result.current.catImages).toEqual(mockInitialImages);
    expect(result.current.currentPage).toBe(1);
    expect(result.current.error).toBe("");
  });

  it("should handle default parameters in loadCatImages", async () => {
    const newImages: CatImage[] = [
      {
        id: "cat3",
        url: "https://example.com/cat3.jpg",
        width: 400,
        height: 300,
      },
    ];

    mockGetCatImages.mockResolvedValue(newImages);

    const { result } = renderHook(() =>
      useCatImages({ initialImages: mockInitialImages }),
    );

    await act(async () => {
      await result.current.loadCatImages(); // No parameters
    });

    expect(mockGetCatImages).toHaveBeenCalledWith(
      20,
      undefined,
      undefined,
      0, // Default page 1 - 1 = 0
    );
    expect(result.current.currentPage).toBe(1);
  });

  it("should calculate totalPages correctly for partial page", async () => {
    const partialImages: CatImage[] = [
      {
        id: "cat1",
        url: "https://example.com/cat1.jpg",
        width: 400,
        height: 300,
      },
    ]; // Less than 20 images

    mockGetCatImages.mockResolvedValue(partialImages);

    const { result } = renderHook(() =>
      useCatImages({ initialImages: mockInitialImages }),
    );

    await act(async () => {
      await result.current.loadCatImages(5);
    });

    expect(result.current.totalPages).toBe(5); // Should be Math.max(page, 1)
    expect(result.current.hasMore).toBe(false);
  });

  it("should calculate totalPages correctly for full page", async () => {
    mockGetCatImages.mockResolvedValue(mockFullPageImages);

    const { result } = renderHook(() =>
      useCatImages({ initialImages: mockInitialImages }),
    );

    await act(async () => {
      await result.current.loadCatImages(3);
    });

    expect(result.current.totalPages).toBe(4); // Should be page + 1
    expect(result.current.hasMore).toBe(true);
  });
});
