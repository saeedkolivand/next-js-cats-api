interface ErrorMessageProps {
  message: string;
  className?: string;
}

export const ErrorMessage = ({
  message,
  className = "",
}: ErrorMessageProps) => {
  return (
    <div
      className={`max-w-2xl mx-auto mb-6 p-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg animate-bounce-slow ${className}`}
      role="alert"
      aria-live="polite"
    >
      <p className="text-red-800 dark:text-red-200 text-center">{message}</p>
    </div>
  );
};
