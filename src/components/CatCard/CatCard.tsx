import Image from "next/image";
import Link from "next/link";
import { CatImage } from "@/services/catService";

interface CatCardProps {
  cat: CatImage;
  index?: number;
}

export const CatCard = ({ cat, index = 0 }: CatCardProps) => {
  return (
    <Link href={`/cats/${cat.id}`}>
      <div
        key={cat.id}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-in-up focus-within:ring-2 focus-within:ring-purple-500 cursor-pointer"
        style={{ animationDelay: `${index * 0.05}s` }}
        role="article"
        aria-labelledby={`cat-${cat.id}-title`}
        aria-describedby={`cat-${cat.id}-description`}
      >
        <div className="relative aspect-square">
          <Image
            src={cat.url}
            alt={`Cat ${cat.id} - ${cat.breeds?.[0]?.name || "Unknown breed"}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            priority={index < 4}
            fetchPriority={index === 0 ? "high" : "auto"}
          />
        </div>

        <div className="p-4">
          {cat.breeds && cat.breeds.length > 0 && (
            <h3
              id={`cat-${cat.id}-title`}
              className="font-semibold text-gray-900 dark:text-white mb-2"
            >
              {cat.breeds[0].name}
            </h3>
          )}
          {cat.categories && cat.categories.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2" aria-label="Categories">
              {cat.categories.map((category) => (
                <span
                  key={category.id}
                  className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded"
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}
          <p
            id={`cat-${cat.id}-description`}
            className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2"
          >
            {cat.breeds?.[0]?.temperament || "Unknown temperament"}
          </p>
        </div>
      </div>
    </Link>
  );
};
