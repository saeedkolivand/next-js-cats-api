import { useState, useCallback } from "react";
import { CatImage, getCatImages } from "@/services/catService";

export interface UseCatImagesOptions {
  initialImages: CatImage[];
  selectedBreed?: string;
}

export interface UseCatImagesReturn {
  catImages: CatImage[];
  loading: boolean;
  error: string;
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  loadCatImages: (
    page?: number,
    breedId?: string,
    resetToInitial?: boolean,
  ) => Promise<void>;
  resetFilters: () => void;
}

export const useCatImages = ({
  initialImages,
  selectedBreed,
}: UseCatImagesOptions): UseCatImagesReturn => {
  const [catImages, setCatImages] = useState<CatImage[]>(initialImages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    initialImages.length === 20 ? 2 : 1,
  );
  const [hasMore, setHasMore] = useState(initialImages.length === 20);

  const loadCatImages = useCallback(
    async (page: number = 1, breedId?: string, resetToInitial?: boolean) => {
      // If resetting to initial, use cached initial data instead of API call
      if (resetToInitial) {
        console.log("Resetting to initial cached images");
        setCatImages(initialImages);
        setCurrentPage(1);
        setTotalPages(initialImages.length === 20 ? 2 : 1);
        setHasMore(initialImages.length === 20);
        setError("");
        setLoading(false);
        return;
      }

      console.log("Loading cat images for page:", page);
      setLoading(true);
      setError("");

      try {
        const images = await getCatImages(
          20,
          breedId !== undefined ? breedId : selectedBreed || undefined,
          undefined,
          page - 1, // API uses 0-based indexing
        );

        console.log("Received images:", images.length, "for page:", page);
        setCatImages(images);
        setCurrentPage(page);
        setHasMore(images.length === 20);

        // Always show at least current page, and show next page if we have a full page
        if (images.length < 20) {
          setTotalPages(Math.max(page, 1)); // At least page 1
        } else {
          setTotalPages(page + 1); // We know there's at least one more page
        }

        console.log(
          "Set totalPages to:",
          page + (images.length === 20 ? 1 : 0),
        );
      } catch (err) {
        console.error("Error loading cat images:", err);
        setError("Failed to load cat images");
      } finally {
        setLoading(false);
      }
    },
    [selectedBreed, initialImages],
  );

  const resetFilters = useCallback(() => {
    setCurrentPage(1);
    loadCatImages(1, undefined, true);
  }, [loadCatImages]);

  return {
    catImages,
    loading,
    error,
    currentPage,
    totalPages,
    hasMore,
    loadCatImages,
    resetFilters,
  };
};
