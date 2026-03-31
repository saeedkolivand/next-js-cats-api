import { unstable_cache } from "next/cache";

// Cache cat images for 10 minutes
export const getCachedCatImages = unstable_cache(
  async (
    limit: number = 20,
    breedId?: string,
    categoryId?: number,
    page: number = 0,
  ) => {
    const { getCatImages } = await import("@/services/catService");
    return getCatImages(limit, breedId, categoryId, page);
  },
  ["cat-images"],
  {
    revalidate: 600, // 10 minutes
    tags: ["cat-images"],
  },
);

// Cache cat breeds for 10 minutes
export const getCachedBreeds = unstable_cache(
  async () => {
    const { getBreeds } = await import("@/services/catService");
    return getBreeds();
  },
  ["cat-breeds"],
  {
    revalidate: 600, // 10 minutes
    tags: ["cat-breeds"],
  },
);
