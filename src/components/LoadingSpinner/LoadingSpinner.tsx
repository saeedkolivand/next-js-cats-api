interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  label?: string;
  className?: string;
}

export const LoadingSpinner = ({
  size = "medium",
  label,
  className = "",
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-8 w-8",
    large: "h-12 w-12",
  };

  return (
    <div
      className={`flex justify-center items-center ${className}`}
      role="status"
      aria-live="polite"
      aria-label={label || "Loading"}
    >
      <div
        className={`animate-spin rounded-full border-b-2 border-purple-600 ${sizeClasses[size]}`}
        aria-hidden="true"
      />
      {label && (
        <span className="ml-2 text-gray-600 dark:text-gray-400">{label}</span>
      )}
    </div>
  );
};
