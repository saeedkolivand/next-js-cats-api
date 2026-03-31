import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - Cat Explorer",
  description:
    "Welcome to Cat Explorer! Discover amazing cat breeds and adorable cat images from around the world.",
};

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 font-sans dark:from-gray-900 dark:to-purple-900">
      <main className="flex flex-1 w-full max-w-4xl flex-col items-center justify-between py-16 px-8 bg-white/80 dark:bg-transparent backdrop-blur-sm rounded-2xl sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center animate-float">
              <span className="text-2xl">🐱</span>
            </div>
            <h1 className="text-4xl font-bold text-purple-900 dark:text-purple-100">
              Cat Explorer
            </h1>
          </div>

          <h2 className="max-w-2xl text-2xl font-semibold leading-10 tracking-tight text-gray-900 dark:text-gray-50">
            Discover Amazing Cat Breeds & Images
          </h2>

          <p className="max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
            Welcome to Cat Explorer! Your ultimate destination for discovering
            fascinating cat breeds and adorable cat images from around the
            world. Powered by The Cat API, we bring you comprehensive
            information about different cat breeds, their characteristics, and
            stunning photos.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl mt-8">
            <div className="bg-purple-50 dark:bg-purple-900/30 p-6 rounded-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div
                className="text-3xl mb-3 animate-bounce-slow"
                style={{ animationDelay: "0.8s" }}
              >
                📸
              </div>
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                High-Quality Images
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Browse through thousands of adorable cat photos
              </p>
            </div>

            <div className="bg-pink-50 dark:bg-pink-900/30 p-6 rounded-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div
                className="text-3xl mb-3 animate-bounce-slow"
                style={{ animationDelay: "1s" }}
              >
                🐾
              </div>
              <h3 className="font-semibold text-pink-900 dark:text-pink-100 mb-2">
                Breed Information
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Learn about different cat breeds and their traits
              </p>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div
                className="text-3xl mb-3 animate-bounce-slow"
                style={{ animationDelay: "1.2s" }}
              >
                🌍
              </div>
              <h3 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">
                Global Database
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Access cat data from trusted sources worldwide
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-base font-medium sm:flex-row w-full max-w-md mt-8">
            <Link
              href="/cats"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-purple-600 px-5 text-white transition-colors hover:bg-purple-700"
            >
              Explore Cats
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
