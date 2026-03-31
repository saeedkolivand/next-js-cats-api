import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900 px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Cat Illustration */}
        <div className="relative">
          <div className="text-8xl mb-4">🐱</div>
          <div className="absolute -top-2 -right-2 text-4xl animate-bounce">
            ❓
          </div>
        </div>

        {/* Error Content */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-purple-900 dark:text-purple-100">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-purple-800 dark:text-purple-200">
            This Cat is Lost!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            The page you&#39;re looking for has wandered off. Even our best cats
            couldn&#39;t find it!
          </p>
        </div>

        {/* Cat Paw Prints */}
        <div className="flex justify-center space-x-2 opacity-50">
          <span className="text-2xl">🐾</span>
          <span className="text-2xl">🐾</span>
          <span className="text-2xl">🐾</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Go Home
          </Link>
          <Link
            href="/cats"
            className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Browse Cats
          </Link>
        </div>

        {/* Fun Message */}
        <div className="mt-8 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
          <p className="text-sm text-purple-700 dark:text-purple-300 italic">
            &#34;Cats may have nine lives, but this page only had one... and
            it&#39;s gone.&#34;
          </p>
        </div>
      </div>
    </div>
  );
}
