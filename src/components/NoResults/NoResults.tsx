interface NoResultsProps {
  message?: string;
  className?: string;
}

export const NoResults = ({
  message = "No results found",
  className = "",
}: NoResultsProps) => {
  return (
    <div
      className={`text-center py-12 animate-slide-in-up ${className}`}
      role="status"
      aria-live="polite"
    >
      <p className="text-gray-600 dark:text-gray-400">{message}</p>
    </div>
  );
};
