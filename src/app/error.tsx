"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900 px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Sad Cat Illustration */}
        <div className="relative">
          <div className="text-8xl mb-4">😿</div>
          <div className="absolute -top-2 -right-2 text-4xl animate-pulse">
            ⚠️
          </div>
        </div>

        {/* Error Content */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-red-600 dark:text-red-400">
            500
          </h1>
          <h2 className="text-2xl font-semibold text-purple-800 dark:text-purple-200">
            Something Went Wrong!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Our cat got tangled in the yarn! We&#39;re working on fixing this
            mess.
          </p>
        </div>

        {/* Broken Elements */}
        <div className="flex justify-center space-x-2 opacity-50">
          <span className="text-2xl">💔</span>
          <span className="text-2xl">🧶</span>
          <span className="text-2xl">💔</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Go Home
          </Link>
        </div>

        {/* Technical Details (Development Only) */}
        {process.env.NODE_ENV === "development" && error.digest && (
          <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <p className="text-sm text-red-700 dark:text-red-300 font-mono">
              Error ID: {error.digest}
            </p>
          </div>
        )}

        {/* Fun Message */}
        <div className="mt-8 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
          <p className="text-sm text-purple-700 dark:text-purple-300 italic">
            &#34;Even the best cats sometimes knock things over. We&#39;ll clean
            this up!&#34;
          </p>
        </div>
      </div>
    </div>
  );
}
