import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "./Header";

describe("Header", () => {
  it("renders navigation link", () => {
    render(<Header />);

    const nav = screen.getByLabelText("Main navigation");
    expect(nav).toBeInTheDocument();

    const link = screen.getByLabelText("Go back to home page");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
    expect(screen.getByText("Back to Home")).toBeInTheDocument();
  });

  it("calls onBackClick when link is clicked", async () => {
    const mockOnBackClick = jest.fn();
    const user = userEvent.setup();

    render(<Header onBackClick={mockOnBackClick} />);

    const link = screen.getByLabelText("Go back to home page");
    await user.click(link);

    expect(mockOnBackClick).toHaveBeenCalledTimes(1);
  });

  it("renders without onBackClick prop", () => {
    render(<Header />);

    const link = screen.getByLabelText("Go back to home page");
    expect(link).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();

    const nav = screen.getByLabelText("Main navigation");
    expect(nav).toBeInTheDocument();

    const link = screen.getByLabelText("Go back to home page");
    expect(link).toBeInTheDocument();

    const arrow = screen.getByText("←");
    expect(arrow).toHaveAttribute("aria-hidden", "true");
  });
});
