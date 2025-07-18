# GitHub Copilot Instructions for Coffee Taste Logger

## Project Overview

This is a React Native Expo application for logging coffee taste experiences using a three-point scoring system (Tongue Taste, Retronasal, Mouth Tactile). The app uses Expo Router for navigation and Unistyles for styling.

## Package Manager

**ALWAYS use bun** as the package manager:

- Install dependencies: `bun install`
- Add packages: `bun add <package>`
- Remove packages: `bun remove <package>`
- Run scripts: `bun run <script>`

## Technology Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router (file-based routing)
- **Styling**: Unistyles (no inline styles except for dynamic values)
- **Language**: TypeScript
- **Testing**: Jest with React Native Testing Library
- **Package Manager**: Bun

## Code Style Guidelines

### Component Structure

- Use functional components with hooks only
- No class components
- Keep components small and focused (single responsibility)
- Use meaningful component and variable names

### Naming Conventions

- **Components**: PascalCase (e.g., `CoffeeLogItem`)
- **Files**: Match component names for components, camelCase for utilities
- **Variables/Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Types/Interfaces**: PascalCase with `I` prefix for interfaces or `T` prefix for types

### File Structure

```
src/
├── app/           # Expo Router pages
├── components/    # Reusable components
├── styles/        # Unistyles configuration
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── hooks/         # Custom React hooks
```

## Development Practices

### Before Starting Work

1. Pull latest changes
2. Run `bun install` to ensure dependencies are up to date
3. Run `bun run typecheck` to ensure no existing type errors

### During Development

- Write clean, self-documenting code
- Add comments only when necessary to explain "why", not "what"
- Keep functions small and focused
- Use meaningful variable names
- No console.log statements (use console.warn/error where appropriate)

### Before Committing (REQUIRED)

1. Run `bun run lint` - fix all linting errors
2. Run `bun run format` - format all code
3. Run `bun run typecheck` - resolve all TypeScript errors
4. Manually test on at least one platform
5. Commit only after all checks pass

## Project-Specific Guidelines

### Coffee Taste Logger Features

- Maintain consistency in the three-point scoring system
- Keep UI simple and elegant for quick logging
- Optimize list rendering for large numbers of coffee logs
- Ensure accessibility with proper labels

### Styling

- Use Unistyles for all styling
- No inline styles except for dynamic values
- Follow consistent design patterns

### Navigation

- Use Expo Router for all navigation
- Follow file-based routing patterns
- Keep navigation structure simple and intuitive

### State Management

- Use React hooks for local state
- Consider Context API for shared state
- Keep state management simple and predictable

### Icons and Assets

- Use SF Symbols for iOS
- Provide PNG alternatives for Android
- Optimize asset sizes for performance

### Testing

- Write unit tests for utility functions
- Write integration tests for critical flows
- Test accessibility features

## Git Commit Messages

Follow conventional commits format:

- `feat:` for new features
- `fix:` for bug fixes
- `chore:` for maintenance tasks
- `docs:` for documentation
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for test additions/changes

## Dependencies

- Always use `bun add` for adding dependencies
- Prefer well-maintained packages with TypeScript support
- Document why a dependency was added in commit messages
- Keep dependencies minimal and focused

## Quality Checklist

Before suggesting any code completion, ensure:

- [ ] TypeScript types are properly defined
- [ ] Code follows naming conventions
- [ ] No console.log statements
- [ ] Proper error handling
- [ ] Accessibility considerations
- [ ] Performance optimizations where applicable
- [ ] Follows project's architectural patterns

## Common Patterns to Follow

### Component Pattern

```typescript
import { StyleSheet } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

interface ComponentProps {
  // Define props with proper TypeScript types
}

export const Component: React.FC<ComponentProps> = ({ ...props }) => {
  const { styles } = useStyles(stylesheet);

  // Component logic here

  return (
    // JSX here
  );
};

const stylesheet = createStyleSheet((theme) => ({
  // Styles here
}));
```

### Utility Function Pattern

```typescript
/**
 * Brief description of what the function does
 */
export const utilityFunction = (param: Type): ReturnType => {
	// Implementation
}
```

### Hook Pattern

```typescript
export const useCustomHook = (param: Type) => {
	// Hook implementation
	return {
		/* return values */
	}
}
```

## Performance Considerations

- Use React.memo for components that re-render frequently
- Implement proper list virtualization for large datasets
- Optimize image loading and caching
- Use lazy loading where appropriate

## Accessibility

- Provide proper accessibility labels
- Ensure keyboard navigation works
- Test with screen readers
- Follow WCAG guidelines
