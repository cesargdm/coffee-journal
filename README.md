# Coffee Taste Logger

A simple and elegant app to log coffee tasting experiences using three key dimensions: Tongue Taste, Retronasal, and Mouth Tactile.

## Features

- **Native Bottom Tabs Navigation**: Truly native tab experience across iOS, Android, and Web
- **Coffee Taste Logging**: Track your coffee experiences with three-point scoring system
- **Modern UI**: Built with Unistyles for consistent, theme-aware styling
- **Cross-Platform**: Supports iOS, Android, Web, and iPad
- **Dark Mode**: Automatic theme switching with system preferences

## Tech Stack

- **Framework**: [Expo](https://expo.dev) (SDK 53)
- **Package Manager**: [Bun](https://bun.sh)
- **Navigation**: [Expo Router](https://expo.github.io/router) with [React Native Bottom Tabs](https://github.com/callstackincubator/react-native-bottom-tabs)
- **Styling**: [Unistyles 3](https://www.unistyl.es)
- **Language**: TypeScript

## Project Structure

```
coffee-taste-logger/
├── app/                    # Expo Router app directory
│   ├── _layout.tsx        # Root layout
│   └── (tabs)/           # Tab navigation
│       ├── _layout.tsx   # Tabs layout
│       ├── index.tsx     # Logs screen
│       └── settings.tsx  # Settings screen
├── components/            # Reusable components
├── styles/               # Styling configuration
│   └── unistyles.ts     # Theme configuration
└── assets/              # Images and icons
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
cd coffee-taste-logger

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

## License

MIT
