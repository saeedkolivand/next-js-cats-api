interface ViewModeToggleProps {
  viewMode: "images" | "breeds";
  onViewModeChange: (mode: "images" | "breeds") => void;
}

export const ViewModeToggle = ({
  viewMode,
  onViewModeChange,
}: ViewModeToggleProps) => {
  const handleKeyDown = (
    event: React.KeyboardEvent,
    targetMode: "images" | "breeds",
  ) => {
    let nextMode: "images" | "breeds" = targetMode;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextMode = targetMode === "images" ? "breeds" : "images";
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextMode = targetMode === "images" ? "breeds" : "images";
        break;
      case "Home":
        nextMode = "images";
        break;
      case "End":
        nextMode = "breeds";
        break;
      default:
        return;
    }

    event.preventDefault();
    onViewModeChange(nextMode);
  };

  return (
    <div
      className="flex justify-center mb-6"
      role="tablist"
      aria-label="View mode selection"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-1 flex">
        <button
          onClick={() => onViewModeChange("images")}
          onKeyDown={(e) => handleKeyDown(e, "images")}
          className={`px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            viewMode === "images"
              ? "bg-purple-600 text-white"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          }`}
          role="tab"
          aria-selected={viewMode === "images"}
          aria-controls="images-panel"
          id="images-tab"
          tabIndex={viewMode === "images" ? 0 : -1}
        >
          <span aria-hidden="true">📸</span> Cat Images
        </button>
        <button
          onClick={() => onViewModeChange("breeds")}
          onKeyDown={(e) => handleKeyDown(e, "breeds")}
          className={`px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            viewMode === "breeds"
              ? "bg-purple-600 text-white"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          }`}
          role="tab"
          aria-selected={viewMode === "breeds"}
          aria-controls="breeds-panel"
          id="breeds-tab"
          tabIndex={viewMode === "breeds" ? 0 : -1}
        >
          <span aria-hidden="true">🐾</span> Cat Breeds
        </button>
      </div>
    </div>
  );
};
