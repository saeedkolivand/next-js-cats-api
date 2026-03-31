# Next.js Cats API Explorer

A modern, feature-rich web application built with Next.js 16, React 19, and TypeScript that allows users to explore cat breeds and browse adorable cat images from The Cat API.

## 🐱 Features

- **Browse Cat Breeds**: Discover comprehensive information about various cat breeds
- **High-Quality Images**: View thousands of adorable cat photos with filtering options
- **Responsive Design**: Beautiful, mobile-first interface built with Tailwind CSS
- **Modern Stack**: Built with the latest technologies including Next.js 16 and React 19
- **TypeScript**: Full type safety throughout the application
- **Testing**: Comprehensive test suite with Jest and React Testing Library
- **Code Quality**: ESLint, Prettier, and Husky for maintaining clean code
- **Security**: Content Security Policy and security best practices

## 🚀 Tech Stack

### Frontend

- **Next.js 16.2.1** - React framework with App Router
- **React 19.2.4** - UI library
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS 4.2.2** - Utility-first CSS framework

### Backend & API

- **Next.js API Routes** - Server-side API endpoints
- **Axios 1.14.0** - HTTP client for API requests
- **NextAuth 4.24.13** - Authentication solution

### Development Tools

- **ESLint 9** - Code linting and formatting
- **Prettier 3.8.1** - Code formatting
- **Husky 9.1.7** - Git hooks
- **Commitlint** - Conventional commit messages
- **Jest 30.3.0** - Testing framework
- **React Testing Library** - Component testing

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/saeedkolivand/next-js-cats-api.git
cd next-js-cats-api
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.sample .env.local
```

4. Configure your environment variables in `.env.local`:

```env
# Base API Configuration
NEXT_PUBLIC_BASE_API_URL=https://api.thecatapi.com
NEXT_PUBLIC_BASE_API_VERSION=v1
NEXT_PUBLIC_CAT_API_KEY=your-cat-api-key-here
```

## 🏃‍♂️ Getting Started

1. Start the development server:

```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run typecheck` - Run TypeScript type checking

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── cats/              # Cats-related pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable React components
│   ├── BreedCard/         # Breed information card
│   ├── CatCard/           # Cat image card
│   ├── CatGallery/        # Gallery component
│   ├── Header/            # Navigation header
│   └── ...                # Other UI components
├── config/                # Configuration files
│   └── security.ts        # Security configurations
├── hooks/                 # Custom React hooks
│   └── useCatImages/      # Cat images hook
└── proxy.ts               # API proxy configuration
```

## 🧪 Testing

The project includes a comprehensive test suite using Jest and React Testing Library:

- Unit tests for components
- Integration tests for API routes
- Coverage reporting
- Watch mode for development

Run tests with:

```bash
npm run test              # Run all tests
npm run test:watch        # Run tests in watch mode
npm run test:coverage     # Run tests with coverage
```

## 🔧 Code Quality

This project maintains high code quality standards with:

- **ESLint**: JavaScript/TypeScript linting with Next.js, React, and Prettier configurations
- **Prettier**: Code formatting with consistent style
- **Husky**: Git hooks for pre-commit and pre-push validation
- **Commitlint**: Enforces conventional commit messages
- **Lint-staged**: Runs linters and formatters on staged files

### Git Hooks

- **Pre-commit**: Runs ESLint and Prettier on staged files
- **Pre-push**: Runs tests and type checking
- **Commit-msg**: Validates commit message format

## 🎨 Styling

The application uses Tailwind CSS for styling with:

- Dark mode support
- Responsive design
- Custom animations and transitions
- Component-based styling approach

## 🔒 Security

Security features implemented:

- Content Security Policy (CSP)
- API key management through environment variables
- Input validation and sanitization
- Secure headers configuration

## 🌐 Environment Variables

Create a `.env.local` file with the following variables:

```env
# API Configuration
NEXT_PUBLIC_BASE_API_URL=https://api.thecatapi.com
NEXT_PUBLIC_BASE_API_VERSION=v1
NEXT_PUBLIC_CAT_API_KEY=your-api-key-here
```

**Note**: Get your API key from [The Cat API](https://thecatapi.com/)

## 📱 Browser Support

This application supports all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using conventional commits
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Message Format

This project follows [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer(s)]
```

Examples:

- `feat(cats): add breed filtering functionality`
- `fix(ui): resolve responsive layout issues`
- `docs(readme): update installation instructions`

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [The Cat API](https://thecatapi.com/) for providing the cat data and images
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- All contributors who help improve this project

## 📞 Support

If you have any questions or need support, please:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Join our community discussions

---

Built with ❤️ and lots of ☕ by cat lovers everywhere! 🐱
