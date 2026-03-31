// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Mock Next.js router
let mockSearchParams = {};
export const mockRouter = {
  pathname: "/test",
  query: mockSearchParams, // Provide a mock query value
  asPath: "/test",
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
  },
};

// Mock Next.js router (for pages directory or older Next.js versions)
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: () => mockRouter,
}));

jest.mock("next/link", () => {
  return function MockLink({ children, href, ...props }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

// Mock Next.js navigation (for App Router)
global.__setMockSearchParams = (params) => {
  mockSearchParams = params;
};
jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: jest.fn(() => mockRouter),
  useSearchParams: jest.fn(() => ({
    get: (param) => mockSearchParams[param] ?? null,
  })),
  usePathname: jest.fn(() => mockRouter.pathname),
  useParams: jest.fn(() => ({})),
}));

// Mock URL.createObjectURL and URL.revokeObjectURL while preserving URL constructor
const originalURL = global.URL;
global.URL = class extends originalURL {
  static createObjectURL = jest.fn(() => "mock-object-url");
  static revokeObjectURL = jest.fn();
};
