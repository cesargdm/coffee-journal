# Coffee Taste Logger - Test Suite

This directory contains the test suite for the Coffee Taste Logger app.

## Setup

The test suite uses:
- **Jest**: JavaScript testing framework
- **React Native Testing Library**: Testing utilities for React Native components
- **jest-expo**: Jest preset configured for Expo projects

## Test Structure

- `LogsScreen.test.tsx`: Tests for the coffee logs list screen
- `SettingsScreen.test.tsx`: Tests for the settings screen including theme toggle
- `unistyles.test.ts`: Tests for the theme configuration

## Running Tests

```bash
# Run all tests in watch mode
bun run test

# Run tests once (no watch)
bun run test --no-watchAll

# Run tests with coverage
bun run test --coverage
```

## Mocking Strategy

Global mocks are configured in `jest.setup.js` for:
- `react-native-unistyles`: StyleSheet and UnistylesRuntime
- `react-native-safe-area-context`: SafeAreaView components
- `expo-router`: Navigation hooks and components
- `expo-constants`: App configuration
- Various other Expo and React Native modules

## Writing New Tests

When adding new tests:
1. Place test files in the `__tests__` directory
2. Follow the naming convention: `ComponentName.test.tsx`
3. Use React Native Testing Library for component tests
4. Focus on user interactions rather than implementation details