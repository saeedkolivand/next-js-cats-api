import Image from "next/image";
import { CatImage } from "@/services/catService";
import Link from "next/link";

interface CatDetailsProps {
  cat: CatImage;
}

export const CatDetails = ({ cat }: CatDetailsProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Link
          href="/cats"
          className="inline-flex items-center gap-2 mb-8 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors duration-200"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Cats
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            {/* Image section */}
            <div className="relative aspect-video md:aspect-square lg:aspect-video">
              <Image
                src={cat.url}
                alt={`Cat ${cat.id} - ${cat.breeds?.[0]?.name || "Unknown breed"}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                priority
              />
            </div>

            {/* Details section */}
            <div className="p-6 md:p-8">
              {/* Title */}
              <div className="mb-6">
                {cat.breeds && cat.breeds.length > 0 && (
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {cat.breeds[0].name}
                  </h1>
                )}
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Cat ID: {cat.id}
                </p>
              </div>

              {/* Categories */}
              {cat.categories && cat.categories.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Categories
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {cat.categories.map((category) => (
                      <span
                        key={category.id}
                        className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Breed Information */}
              {cat.breeds && cat.breeds.length > 0 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      About this Breed
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {cat.breeds[0].description || "No description available."}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Temperament
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {cat.breeds[0].temperament || "Unknown temperament"}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Characteristics
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Origin:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {cat.breeds[0].origin || "Unknown"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Life Span:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {cat.breeds[0].life_span || "Unknown"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Adaptability:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {cat.breeds[0].adaptability}/5
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Affection Level:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {cat.breeds[0].affection_level}/5
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Child Friendly:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {cat.breeds[0].child_friendly}/5
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Dog Friendly:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {cat.breeds[0].dog_friendly}/5
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Energy Level:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {cat.breeds[0].energy_level}/5
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Grooming:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {cat.breeds[0].grooming}/5
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Health Issues:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {cat.breeds[0].health_issues}/5
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Intelligence:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {cat.breeds[0].intelligence}/5
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Shedding Level:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {cat.breeds[0].shedding_level}/5
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Social Needs:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {cat.breeds[0].social_needs}/5
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Stranger Friendly:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {cat.breeds[0].stranger_friendly}/5
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Vocalisation:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {cat.breeds[0].vocalisation}/5
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Hypoallergenic:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {cat.breeds[0].hypoallergenic === 1 ? "Yes" : "No"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {cat.breeds[0].wikipedia_url && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Learn More
                      </h3>
                      <a
                        href={cat.breeds[0].wikipedia_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors duration-200"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        Wikipedia Article
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Image dimensions */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Image Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Width:
                    </span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                      {cat.width}px
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Height:
                    </span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                      {cat.height}px
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
