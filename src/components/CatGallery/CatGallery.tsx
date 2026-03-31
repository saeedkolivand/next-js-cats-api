import { CatImage } from "@/services/catService";
import { CatCard } from "../CatCard/CatCard";

interface CatGalleryProps {
  catImages: CatImage[];
}

export const CatGallery = ({ catImages }: CatGalleryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {catImages.map((cat, index) => (
        <CatCard key={cat.id} cat={cat} index={index} />
      ))}
    </div>
  );
};
