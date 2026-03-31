export default function RootLoading() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center animate-pulse">
          <span className="text-2xl">🐱</span>
        </div>
        <div className="text-lg font-medium text-purple-900 dark:text-purple-100">
          Loading...
        </div>
      </div>
    </div>
  );
}
