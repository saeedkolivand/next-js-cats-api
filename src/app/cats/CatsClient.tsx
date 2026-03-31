"use client";

import { useState, useCallback } from "react";
import { CatImage, CatBreed } from "@/services/catService";
import { useCatImages } from "@/hooks/useCatImages/useCatImages";
import { Header } from "@/components/Header/Header";
import { ViewModeToggle } from "@/components/ViewModeToggle/ViewModeToggle";
import { CatFilters } from "@/components/CatFilters/CatFilters";
import { ErrorMessage } from "@/components/ErrorMessage/ErrorMessage";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
import { CatGallery } from "@/components/CatGallery/CatGallery";
import { Pagination } from "@/components/Pagination/Pagination";
import { BreedGallery } from "@/components/BreedGallery/BreedGallery";
import { NoResults } from "@/components/NoResults/NoResults";

interface CatsClientProps {
  initialCatImages: CatImage[];
  initialBreeds: CatBreed[];
}

export default function CatsClient({
  initialCatImages,
  initialBreeds,
}: CatsClientProps) {
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [viewMode, setViewMode] = useState<"images" | "breeds">("images");

  const {
    catImages,
    loading,
    error,
    currentPage,
    totalPages,
    loadCatImages,
    resetFilters,
  } = useCatImages({
    initialImages: initialCatImages,
    selectedBreed,
  });

  const handleResetFilters = useCallback(() => {
    setSelectedBreed("");
    // Use the hook's resetFilters which now uses cached initial data
    resetFilters();
  }, [resetFilters]);

  const handleBreedChange = useCallback(
    (breedId: string) => {
      setSelectedBreed(breedId);
      loadCatImages(1, breedId);
    },
    [loadCatImages],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      console.log("Page change requested to:", page);
      loadCatImages(page);
    },
    [loadCatImages],
  );

  const handleViewModeChange = useCallback((mode: "images" | "breeds") => {
    setViewMode(mode);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900 animate-slide-in-up">
      <div className="container mx-auto px-4 py-8">
        {/* Skip to main content link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-purple-300"
        >
          Skip to main content
        </a>

        <Header />

        <ViewModeToggle
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
        />

        {/* Filters */}
        {viewMode === "images" && (
          <CatFilters
            breeds={initialBreeds}
            selectedBreed={selectedBreed}
            onBreedChange={handleBreedChange}
            onResetFilters={handleResetFilters}
          />
        )}

        {/* Error Message */}
        {error && <ErrorMessage message={error} />}

        {/* Loading State */}
        {loading && (
          <LoadingSpinner
            size="large"
            label="Loading cat images, please wait"
            className="py-12"
          />
        )}

        {/* Content */}
        {!loading && (
          <main id="main-content" role="main">
            {viewMode === "images" && (
              <section
                id="images-panel"
                role="tabpanel"
                aria-labelledby="images-tab"
                aria-label="Cat images gallery"
                tabIndex={viewMode === "images" ? 0 : -1}
                hidden={viewMode !== "images"}
              >
                {catImages.length === 0 ? (
                  <NoResults message="No cat images found for the selected filters." />
                ) : (
                  <>
                    <CatGallery catImages={catImages} />
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      loading={loading}
                      hasImages={catImages.length > 0}
                    />
                  </>
                )}
              </section>
            )}

            {viewMode === "breeds" && (
              <section
                id="breeds-panel"
                role="tabpanel"
                aria-labelledby="breeds-tab"
                aria-label="Cat breeds list"
                tabIndex={viewMode === "breeds" ? 0 : -1}
                hidden={viewMode !== "breeds"}
              >
                <BreedGallery breeds={initialBreeds} />
              </section>
            )}
          </main>
        )}
      </div>
    </div>
  );
}
