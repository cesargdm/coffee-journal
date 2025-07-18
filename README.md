# Coffee Taste Logger

A simple and elegant app to log coffee tasting experiences using three key dimensions: Tongue Taste, Retronasal, and Mouth Tactile.

## Features

- **Native Tab Navigation**: Clean tab interface for logs and settings
- **Coffee Taste Logging**: Track your coffee experiences with three-point scoring system
- **Modern UI**: Built with Unistyles 3 for consistent, theme-aware styling
- **Cross-Platform**: Supports iOS, Android, Web, and iPad
- **Dark Mode**: Toggle between light and dark themes

## Tech Stack

- **Framework**: [Expo](https://expo.dev) (SDK 53)
- **Package Manager**: [Bun](https://bun.sh)
- **Navigation**: [Expo Router](https://expo.github.io/router)
- **Styling**: [Unistyles 3](https://www.unistyl.es)
- **Language**: TypeScript

## Project Structure

```
.
├── src/                    # Source code
│   ├── app/               # Expo Router app directory
│   │   ├── _layout.tsx    # Root layout
│   │   └── (tabs)/        # Tab navigation
│   │       ├── _layout.tsx # Tabs layout
│   │       ├── index.tsx   # Logs screen
│   │       └── settings.tsx # Settings screen
│   ├── components/        # Reusable components (future)
│   └── styles/           # Styling configuration
│       └── unistyles.ts  # Theme configuration
├── assets/               # Images and icons
├── .cursor/              # Cursor IDE configuration
│   └── rules/           # Development rules
│       └── general.mdc  # General coding guidelines
└── package.json         # Dependencies and scripts
```

## Development Principles

- **Legibility**: Clean, readable code with clear naming conventions
- **Simplicity**: Straightforward architecture without over-engineering
- **Modern Practices**: Latest React Native and TypeScript patterns
- **Elegance**: Thoughtful UI/UX with attention to detail

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed on your machine
- [Expo Go](https://expo.dev/client) app for testing on physical devices
- iOS Simulator (Mac only) or Android Emulator for local testing

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
bun install

# Start the development server
bun run start
```

### Running the App

```bash
# Start the Expo development server
bun run start

# Run on iOS simulator
bun run ios

# Run on Android emulator
bun run android

# Run on web
bun run web
```

### Development Scripts

```bash
# Run linting
bun run lint

# Format code
bun run format

# Type checking
bun run typecheck
```

## Coffee Scoring System

The app uses a three-point scoring system to evaluate coffee:

1. **Tongue Taste**: The initial taste perception on your tongue
2. **Retronasal**: The aroma perception through the back of your nose while tasting
3. **Mouth Tactile**: The physical sensation and texture in your mouth

Each dimension is scored on a 1-10 scale, providing a comprehensive profile of your coffee experience.

## Contributing

This project prioritizes code quality and user experience. When contributing:

1. Maintain code legibility and simplicity
2. Follow existing patterns and conventions
3. Test on multiple platforms before submitting
4. Keep the user experience elegant and intuitive
5. Always run `bun run lint`, `bun run format`, and `bun run typecheck` before committing

## Development Guidelines

See `.cursor/rules/general.mdc` for detailed development guidelines and best practices.

## License

MIT
