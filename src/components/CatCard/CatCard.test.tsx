import { render, screen } from "@testing-library/react";
import { CatCard } from "./CatCard";
import { CatImage } from "@/services/catService";

// Mock Next.js components
jest.mock("next/image", () => {
  return function MockImage({ src, alt, priority, fill, ...props }: any) {
    return (
      <img
        data-testid="cat-image"
        src={src}
        alt={alt}
        {...(fill && {
          style: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          },
        })}
        {...props}
      />
    );
  };
});

describe("CatCard", () => {
  const mockCat: CatImage = {
    id: "test-cat-1",
    url: "https://example.com/cat.jpg",
    width: 400,
    height: 300,
    breeds: [
      {
        id: "breed-1",
        name: "Persian",
        description: "A fluffy cat",
        temperament: "Calm, Affectionate",
        origin: "Iran",
        life_span: "10-17",
        adaptability: 3,
        affection_level: 5,
        child_friendly: 4,
        dog_friendly: 3,
        energy_level: 2,
        grooming: 5,
        health_issues: 2,
        intelligence: 3,
        shedding_level: 4,
        social_needs: 3,
        stranger_friendly: 2,
        vocalisation: 2,
        experimental: 0,
        hairless: 0,
        natural: 1,
        rare: 0,
        rex: 0,
        suppressed_tail: 0,
        short_legs: 0,
        hypoallergenic: 0,
      },
    ],
    categories: [
      {
        id: 1,
        name: "Indoor",
      },
    ],
  };

  it("renders cat card with all information", () => {
    render(<CatCard cat={mockCat} />);

    // Check link wrapper
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/cats/test-cat-1");

    // Check image
    const image = screen.getByTestId("cat-image");
    expect(image).toHaveAttribute("src", "https://example.com/cat.jpg");
    expect(image).toHaveAttribute("alt", "Cat test-cat-1 - Persian");

    // Check breed name
    expect(screen.getByText("Persian")).toBeInTheDocument();

    // Check category
    expect(screen.getByText("Indoor")).toBeInTheDocument();

    // Check temperament
    expect(screen.getByText("Calm, Affectionate")).toBeInTheDocument();
  });

  it("renders cat card without breed information", () => {
    const catWithoutBreeds: CatImage = {
      ...mockCat,
      breeds: undefined,
    };

    render(<CatCard cat={catWithoutBreeds} />);

    // Should not show breed name
    expect(screen.queryByText("Persian")).not.toBeInTheDocument();

    // Should show unknown temperament
    expect(screen.getByText("Unknown temperament")).toBeInTheDocument();
  });

  it("renders cat card without categories", () => {
    const catWithoutCategories: CatImage = {
      ...mockCat,
      categories: undefined,
    };

    render(<CatCard cat={catWithoutCategories} />);

    // Should not show category
    expect(screen.queryByText("Indoor")).not.toBeInTheDocument();
  });

  it("renders cat card with empty breed array", () => {
    const catWithEmptyBreeds: CatImage = {
      ...mockCat,
      breeds: [],
    };

    render(<CatCard cat={catWithEmptyBreeds} />);

    // Should not show breed name
    expect(screen.queryByText("Persian")).not.toBeInTheDocument();

    // Should show unknown temperament
    expect(screen.getByText("Unknown temperament")).toBeInTheDocument();
  });

  it("renders cat card with empty categories array", () => {
    const catWithEmptyCategories: CatImage = {
      ...mockCat,
      categories: [],
    };

    render(<CatCard cat={catWithEmptyCategories} />);

    // Should not show category
    expect(screen.queryByText("Indoor")).not.toBeInTheDocument();
  });

  it("renders with custom index for animation delay", () => {
    const { container } = render(<CatCard cat={mockCat} index={5} />);

    const card = container.querySelector('[style*="animation-delay"]');
    expect(card).toHaveStyle("animation-delay: 0.25s");
  });

  it("renders with default index 0", () => {
    const { container } = render(<CatCard cat={mockCat} />);

    const card = container.querySelector('[style*="animation-delay"]');
    expect(card).toHaveStyle("animation-delay: 0s");
  });

  it("has proper accessibility attributes", () => {
    render(<CatCard cat={mockCat} />);

    const card = screen.getByRole("article");
    expect(card).toHaveAttribute("aria-labelledby", "cat-test-cat-1-title");
    expect(card).toHaveAttribute(
      "aria-describedby",
      "cat-test-cat-1-description",
    );

    const title = screen.getByRole("heading");
    expect(title).toHaveAttribute("id", "cat-test-cat-1-title");

    const description = screen.getByText("Calm, Affectionate");
    expect(description).toHaveAttribute("id", "cat-test-cat-1-description");
  });

  it("renders multiple categories", () => {
    const catWithMultipleCategories: CatImage = {
      ...mockCat,
      categories: [
        { id: 1, name: "Indoor" },
        { id: 2, name: "Lap Cat" },
      ],
    };

    render(<CatCard cat={catWithMultipleCategories} />);

    expect(screen.getByText("Indoor")).toBeInTheDocument();
    expect(screen.getByText("Lap Cat")).toBeInTheDocument();
  });
});
