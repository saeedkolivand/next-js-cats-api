import { render, screen } from "@testing-library/react";
import { ErrorMessage } from "./ErrorMessage";

describe("ErrorMessage", () => {
  it("renders error message correctly", () => {
    render(<ErrorMessage message="Something went wrong" />);

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveAttribute("aria-live", "polite");

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<ErrorMessage message="Error" className="custom-class" />);

    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("custom-class");
  });

  it("has proper styling classes", () => {
    render(<ErrorMessage message="Test error" />);

    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass(
      "max-w-2xl",
      "mx-auto",
      "mb-6",
      "p-4",
      "bg-red-50",
    );
  });

  it("centers the error message text", () => {
    render(<ErrorMessage message="Centered error" />);

    const paragraph = screen.getByText("Centered error");
    expect(paragraph).toHaveClass("text-red-800", "text-center");
  });
});
