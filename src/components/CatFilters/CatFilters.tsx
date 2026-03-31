import { CatBreed } from "@/services/catService";

interface CatFiltersProps {
  breeds: CatBreed[];
  selectedBreed: string;
  onBreedChange: (breedId: string) => void;
  onResetFilters: () => void;
}

export const CatFilters = ({
  breeds,
  selectedBreed,
  onBreedChange,
  onResetFilters,
}: CatFiltersProps) => {
  return (
    <section className="max-w-4xl mx-auto mb-8" aria-label="Filter options">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Filter cat images
        </h2>
        <button
          onClick={onResetFilters}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
          aria-label="Reset all filters"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Reset Filter
        </button>
      </div>
      <div className="max-w-md mx-auto">
        <div className="relative">
          <label
            htmlFor="breed-filter"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Filter by Breed:
          </label>
          <div className="relative">
            <select
              id="breed-filter"
              value={selectedBreed}
              onChange={(e) => onBreedChange(e.target.value)}
              className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none cursor-pointer transition-all duration-200 hover:border-purple-400"
              aria-describedby="breed-filter-description"
            >
              <option
                value=""
                className="font-semibold text-gray-500 dark:text-gray-400"
              >
                All Breeds
              </option>
              {breeds.map((breed) => (
                <option
                  key={breed.id}
                  value={breed.id}
                  className="py-2 px-3 hover:bg-purple-50 dark:hover:bg-purple-900 text-gray-900 dark:text-white"
                >
                  {breed.name}
                </option>
              ))}
            </select>
            {selectedBreed && (
              <button
                onClick={onResetFilters}
                className="absolute right-8 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                aria-label="Clear breed selection"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          <span id="breed-filter-description" className="sr-only">
            Select a cat breed to filter the images
          </span>
        </div>
      </div>
    </section>
  );
};
