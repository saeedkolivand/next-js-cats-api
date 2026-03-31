import { render, screen } from "@testing-library/react";
import { LoadingSpinner } from "./LoadingSpinner";

describe("LoadingSpinner", () => {
  it("renders with default medium size", () => {
    render(<LoadingSpinner />);

    const container = screen.getByRole("status");
    expect(container).toBeInTheDocument();
    expect(container).toHaveAttribute("aria-label", "Loading");

    const spinner = container.querySelector('div[aria-hidden="true"]');
    expect(spinner).toHaveClass("h-8", "w-8");
  });

  it("renders with small size", () => {
    render(<LoadingSpinner size="small" />);

    const container = screen.getByRole("status");
    const spinner = container.querySelector('div[aria-hidden="true"]');
    expect(spinner).toHaveClass("h-4", "w-4");
  });

  it("renders with large size", () => {
    render(<LoadingSpinner size="large" />);

    const container = screen.getByRole("status");
    const spinner = container.querySelector('div[aria-hidden="true"]');
    expect(spinner).toHaveClass("h-12", "w-12");
  });

  it("renders with custom label", () => {
    render(<LoadingSpinner label="Loading data..." />);

    const container = screen.getByRole("status");
    expect(container).toHaveAttribute("aria-label", "Loading data...");
    expect(screen.getByText("Loading data...")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<LoadingSpinner className="custom-class" />);

    const container = screen.getByRole("status");
    expect(container).toHaveClass("custom-class");
  });

  it("renders with all props", () => {
    render(
      <LoadingSpinner
        size="large"
        label="Please wait..."
        className="my-custom-spinner"
      />,
    );

    const container = screen.getByRole("status");
    expect(container).toHaveAttribute("aria-label", "Please wait...");
    expect(container).toHaveClass("my-custom-spinner");

    const spinner = container.querySelector('div[aria-hidden="true"]');
    expect(spinner).toHaveClass("h-12", "w-12");

    expect(screen.getByText("Please wait...")).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(<LoadingSpinner label="Processing..." />);

    const container = screen.getByRole("status");
    expect(container).toHaveAttribute("aria-live", "polite");
    expect(container).toHaveAttribute("aria-label", "Processing...");

    const spinner = container.querySelector('div[aria-hidden="true"]');
    expect(spinner).toHaveAttribute("aria-hidden", "true");
  });

  it("does not render label when not provided", () => {
    render(<LoadingSpinner />);

    // Should not have any text content besides the spinner
    expect(screen.queryByText(/./)).not.toBeInTheDocument();
  });
});
