interface InfiniteScrollToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export const InfiniteScrollToggle = ({
  enabled,
  onToggle,
}: InfiniteScrollToggleProps) => {
  return (
    <div className="flex justify-center mb-6">
      <button
        onClick={onToggle}
        className={`px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${
          enabled ? "bg-green-600 text-white" : "bg-gray-600 text-white"
        }`}
        aria-label={`Infinite scroll is currently ${enabled ? "enabled" : "disabled"}. Click to ${enabled ? "disable" : "enable"}.`}
      >
        {enabled ? "🔄 Infinite Scroll ON" : "📜 Infinite Scroll OFF"}
      </button>
    </div>
  );
};
