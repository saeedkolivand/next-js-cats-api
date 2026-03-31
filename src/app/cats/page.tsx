import CatsClient from "./CatsClient";
import { getCachedCatImages, getCachedBreeds } from "@/lib/cache";

export default async function CatsPage() {
  // Fetch data using cached functions
  const [catImages, breeds] = await Promise.all([
    getCachedCatImages(20),
    getCachedBreeds(),
  ]);

  return <CatsClient initialCatImages={catImages} initialBreeds={breeds} />;
}
