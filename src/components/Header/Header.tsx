import Link from "next/link";

interface HeaderProps {
  onBackClick?: () => void;
}

export const Header = ({ onBackClick }: HeaderProps) => {
  return (
    <header className="text-center mb-8" role="banner">
      <nav
        className="flex justify-between items-center mb-4"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-md p-2"
          aria-label="Go back to home page"
          onClick={onBackClick}
        >
          <span aria-hidden="true">←</span>
          Back to Home
        </Link>
      </nav>
      <h1 className="text-4xl font-bold text-purple-900 dark:text-purple-100 mb-2 animate-float">
        <span aria-hidden="true">🐱</span> Cat Explorer
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        Discover beautiful cats and learn about different breeds
      </p>
    </header>
  );
};
