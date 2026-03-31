import { CatBreed } from "@/services/catService";
import { BreedCard } from "../BreedCard/BreedCard";

interface BreedGalleryProps {
  breeds: CatBreed[];
}

export const BreedGallery = ({ breeds }: BreedGalleryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {breeds.map((breed, index) => (
        <BreedCard key={breed.id} breed={breed} index={index} />
      ))}
    </div>
  );
};
