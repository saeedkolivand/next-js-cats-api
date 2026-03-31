import { createGatewayService } from "@/network/gateway/Gateway";
import { sanitizeInput, isValidUrl } from "@/lib/security";
import { SECURITY_CONFIG } from "@/config/security";

export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds?: CatBreed[];
  categories?: CatCategory[];
  favourite?: Favourite;
}

export interface CatBreed {
  id: string;
  name: string;
  description: string;
  temperament: string;
  origin: string;
  life_span: string;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  dog_friendly: number;
  energy_level: number;
  grooming: number;
  health_issues: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  stranger_friendly: number;
  vocalisation: number;
  experimental: number;
  hairless: number;
  natural: number;
  rare: number;
  rex: number;
  suppressed_tail: number;
  short_legs: number;
  wikipedia_url?: string;
  hypoallergenic: number;
  reference_image_id?: string;
  image?: {
    id: string;
    url: string;
    width: number;
    height: number;
  };
}

export interface CatCategory {
  id: number;
  name: string;
}

export interface Favourite {
  id: string;
  user_id: string;
  image_id: string;
  sub_id?: string;
  created_at: string;
  image: {
    id: string;
    url: string;
    width: number;
    height: number;
  };
}

const API_BASE = "https://api.thecatapi.com/v1";
const API_KEY =
  process.env.NEXT_PUBLIC_CAT_API_KEY ||
  "live_hR0C8yP3xv6vJ3O0sL5xW7fK2qM9nT1pU4rY6iE8jG0kL2mN4oP6qR8sT0uV2w";

// Create gateway service for The Cat API
const catApiGateway = createGatewayService(API_BASE, "en-US", {
  onBadRequest: (error) => console.error("Bad Request:", error),
  onUnauthorized: (error) => console.error("Unauthorized:", error),
  onForbidden: (error) => console.error("Forbidden:", error),
  onNotFound: (error) => console.error("Not Found:", error),
  onInternalServerError: (error) =>
    console.error("Internal Server Error:", error),
});

class CatService {
  private getHeaders() {
    return {
      "x-api-key": API_KEY,
    };
  }

  async getCatImages(
    limit: number = 20,
    breedId?: string,
    categoryId?: number,
    page: number = 0,
  ): Promise<CatImage[]> {
    try {
      // Validate and sanitize inputs
      const sanitizedLimit = Math.min(Math.max(1, Number(limit) || 20), 100);
      const sanitizedPage = Math.max(0, Number(page) || 0);
      const sanitizedBreedId = breedId
        ? sanitizeInput(breedId.trim())
        : undefined;
      const sanitizedCategoryId = categoryId
        ? Math.max(0, Number(categoryId))
        : undefined;

      const params: Record<string, unknown> = {
        limit: sanitizedLimit,
        has_breeds: 1,
        page: sanitizedPage,
      };

      if (sanitizedBreedId && sanitizedBreedId.length > 0) {
        params.breed_ids = sanitizedBreedId;
      }
      if (sanitizedCategoryId && !isNaN(sanitizedCategoryId)) {
        params.category_ids = sanitizedCategoryId;
      }

      const response = await catApiGateway.get("/images/search", params, {
        headers: this.getHeaders(),
      });

      // Validate response data
      if (!Array.isArray(response.data)) {
        throw new Error("Invalid response format from API");
      }

      // Sanitize image URLs
      const sanitizedImages = response.data.filter((image: any) => {
        return (
          image &&
          typeof image === "object" &&
          typeof image.url === "string" &&
          isValidUrl(image.url)
        );
      });

      console.log("API response length:", sanitizedImages.length);
      return sanitizedImages;
    } catch (error) {
      console.error("Error fetching cat images:", error);
      throw error;
    }
  }

  async getBreeds(): Promise<CatBreed[]> {
    try {
      const response = await catApiGateway.get(
        "/breeds",
        {},
        {
          headers: this.getHeaders(),
        },
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching cat breeds:", error);
      throw error;
    }
  }

  async getCatById(imageId: string): Promise<CatImage | null> {
    try {
      // Validate and sanitize input
      if (!imageId || typeof imageId !== "string") {
        throw new Error("Invalid image ID provided");
      }

      const sanitizedImageId = sanitizeInput(imageId.trim());
      if (
        sanitizedImageId.length === 0 ||
        sanitizedImageId.length > SECURITY_CONFIG.VALIDATION.MAX_STRING_LENGTH
      ) {
        throw new Error("Image ID length is invalid");
      }

      const response = await catApiGateway.get(
        `/images/${sanitizedImageId}`,
        {},
        {
          headers: this.getHeaders(),
        },
      );

      // Validate response data
      if (!response.data || typeof response.data !== "object") {
        throw new Error("Invalid response format from API");
      }

      // Validate image URL
      if (response.data.url && !isValidUrl(response.data.url)) {
        throw new Error("Invalid image URL in response");
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching cat image by ID:", error);
      return null;
    }
  }
}

export const catService = new CatService();

// Server Actions with error handling
export async function getCatImages(
  limit: number = 20,
  breedId?: string,
  categoryId?: number,
  page: number = 0,
): Promise<CatImage[]> {
  try {
    return await catService.getCatImages(limit, breedId, categoryId, page);
  } catch (error) {
    console.error("Failed to fetch cat images:", error);
    return [];
  }
}

export async function getBreeds(): Promise<CatBreed[]> {
  try {
    return await catService.getBreeds();
  } catch (error) {
    console.error("Failed to fetch cat breeds:", error);
    return [];
  }
}

export async function getCatById(imageId: string): Promise<CatImage | null> {
  try {
    return await catService.getCatById(imageId);
  } catch (error) {
    console.error("Failed to fetch cat image:", error);
    return null;
  }
}
