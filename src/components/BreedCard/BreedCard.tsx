import { CatBreed } from "@/services/catService";

interface BreedCardProps {
  breed: CatBreed;
  index: number;
}

export const BreedCard = ({ breed, index }: BreedCardProps) => {
  return (
    <div
      key={breed.id}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-in-up focus-within:ring-2 focus-within:ring-purple-500"
      style={{ animationDelay: `${index * 0.1}s` }}
      role="article"
      aria-labelledby={`breed-${breed.id}-name`}
    >
      <div className="flex items-start justify-between mb-4">
        <h3
          id={`breed-${breed.id}-name`}
          className="text-xl font-semibold text-gray-900 dark:text-white"
        >
          {breed.name}
        </h3>
        <span
          className="text-2xl animate-bounce-slow"
          style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
          aria-hidden="true"
        >
          🐱
        </span>
      </div>

      <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
        <div>
          <span className="font-medium text-gray-900 dark:text-white">
            Origin:
          </span>{" "}
          <span>{breed.origin}</span>
        </div>
        <div>
          <span className="font-medium text-gray-900 dark:text-white">
            Life Span:
          </span>{" "}
          <span>{breed.life_span} years</span>
        </div>
        <div>
          <span className="font-medium text-gray-900 dark:text-white">
            Temperament:
          </span>
          <p className="mt-1">{breed.temperament}</p>
        </div>
        <div>
          <span className="font-medium text-gray-900 dark:text-white">
            Description:
          </span>
          <p className="mt-1 line-clamp-3">{breed.description}</p>
        </div>
      </div>

      <div
        className="mt-4 grid grid-cols-2 gap-2 text-xs"
        aria-label="Breed characteristics"
      >
        <div className="flex items-center gap-1">
          <span aria-hidden="true">❤️</span>
          <span className="text-gray-600 dark:text-gray-400">
            Affection: {breed.affection_level}/5
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span aria-hidden="true">⚡</span>
          <span className="text-gray-600 dark:text-gray-400">
            Energy: {breed.energy_level}/5
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span aria-hidden="true">🧠</span>
          <span className="text-gray-600 dark:text-gray-400">
            Intelligence: {breed.intelligence}/5
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span aria-hidden="true">👶</span>
          <span className="text-gray-600 dark:text-gray-400">
            Child Friendly: {breed.child_friendly}/5
          </span>
        </div>
      </div>
    </div>
  );
};
