# Localization Implementation with Lingui

## Overview

Successfully implemented internationalization (i18n) using Lingui with support for English, Spanish, and Portuguese languages. The implementation includes a language selector using Zeego in the settings screen.

## Features Implemented

### 1. **Multi-language Support**

- **English (en)** - Default language
- **Spanish (es)** - Complete translations
- **Portuguese (pt)** - Complete translations

### 2. **Lingui Configuration**

- **Format**: PO files for easy translation management
- **Catalogs**: Organized in `src/locales/{locale}/messages`
- **Extraction**: Automatic message extraction from source code
- **Compilation**: JavaScript modules generated for runtime

### 3. **Language Selection**

- **Zeego Integration**: Native dropdown menu component
- **Persistent Storage**: Language preference saved to AsyncStorage
- **Dynamic Loading**: Languages loaded on demand
- **Settings Integration**: Language selector in settings screen

### 4. **Internationalized Components**

- **Settings Screen**: All text internationalized
- **Home Screen**: Empty state messages internationalized
- **I18n Provider**: App-wide localization context

## File Structure

```
src/
├── locales/
│   ├── en/
│   │   ├── messages.po     # English translations
│   │   └── messages.js     # Compiled English messages
│   ├── es/
│   │   ├── messages.po     # Spanish translations
│   │   └── messages.js     # Compiled Spanish messages
│   └── pt/
│       ├── messages.po     # Portuguese translations
│       └── messages.js     # Compiled Portuguese messages
├── lib/
│   └── i18n.ts            # i18n configuration and utilities
├── components/
│   ├── I18nProvider.tsx   # App-wide i18n context
│   └── LanguageSelector.tsx # Language selection component
└── app/
    └── _layout.tsx        # Root layout with I18nProvider
```

## Key Components

### 1. **I18n Configuration (`src/lib/i18n.ts`)**

- Locale detection from AsyncStorage and navigator
- Dynamic message loading
- Locale persistence
- Default fallback handling

### 2. **I18nProvider (`src/components/I18nProvider.tsx`)**

- Wraps the entire app with Lingui's I18nProvider
- Handles initialization and loading states
- Provides i18n context to all components

### 3. **LanguageSelector (`src/components/LanguageSelector.tsx`)**

- Zeego dropdown menu for language selection
- Visual feedback for current selection
- Async language switching with persistence

### 4. **Babel Configuration**

- Lingui macro extraction plugin
- Test environment compatibility
- Proper plugin ordering

## Scripts Added

```json
{
	"i18n:extract": "lingui extract",
	"i18n:compile": "lingui compile",
	"i18n:extract-compile": "lingui extract && lingui compile"
}
```

## Usage Examples

### Using Trans Component

```tsx
import { Trans } from '@lingui/react'
;<Trans id="welcome-message">Welcome to the app</Trans>
```

### Using t Macro

```tsx
import { t } from '@lingui/core/macro'
import { useLingui } from '@lingui/react'

const { _ } = useLingui()
const title = _(t`page-title`)
```

## Translation Workflow

1. **Add translatable text** using `<Trans>` components or `t` macro
2. **Extract messages**: `npm run i18n:extract`
3. **Translate messages** in `.po` files
4. **Compile messages**: `npm run i18n:compile`
5. **Test translations** in the app

## Testing

- **Jest Configuration**: Proper mocking for Lingui components
- **Test Compatibility**: Babel configuration handles test environment
- **Mock Translations**: Test-friendly translation mocks

## Dependencies Added

### Core Lingui Packages

- `@lingui/core` - Core i18n functionality
- `@lingui/react` - React components and hooks
- `@lingui/cli` - CLI tools for extraction and compilation
- `@lingui/macro` - Babel macros for string extraction
- `@lingui/babel-plugin-extract-messages` - Message extraction
- `@lingui/detect-locale` - Locale detection utilities

### UI Components

- `zeego` - Native dropdown menu component
- `@react-native-async-storage/async-storage` - Persistent storage

### Development Dependencies

- `babel-plugin-macros` - Babel macro support

## Configuration Files

### Lingui Config (`lingui.config.js`)

```javascript
module.exports = {
	locales: ['en', 'es', 'pt'],
	sourceLocale: 'en',
	catalogs: [
		{
			path: 'src/locales/{locale}/messages',
			include: ['src'],
			exclude: ['**/node_modules/**'],
		},
	],
	format: 'po',
	// ... other options
}
```

### Babel Config (`babel.config.js`)

```javascript
module.exports = function (api) {
	const isTest = api.env('test')
	api.cache(true)

	return {
		plugins: [
			['react-native-unistyles/plugin', { root: 'src' }],
			...(isTest ? [] : ['@lingui/babel-plugin-extract-messages']),
		],
		presets: ['babel-preset-expo'],
	}
}
```

## Quality Assurance

- ✅ **TypeScript**: Full type safety
- ✅ **ESLint**: Code quality and consistency
- ✅ **Prettier**: Code formatting
- ✅ **Testing**: Jest compatibility with proper mocks

## Future Enhancements

1. **RTL Support**: Add right-to-left language support
2. **Pluralization**: Implement plural forms for countable items
3. **Date/Number Formatting**: Locale-specific formatting
4. **More Languages**: Easy to add additional languages
5. **Translation Management**: Integration with translation services

## Maintenance

- **Adding new text**: Always use `<Trans>` or `t` macro
- **Updating translations**: Run extract → translate → compile workflow
- **Adding languages**: Add locale to config and create message files
- **Performance**: Messages are lazy-loaded per locale

The implementation provides a solid foundation for internationalization with room for future expansion and excellent developer experience.
