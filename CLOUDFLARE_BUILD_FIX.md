# Cloudflare Pages Build Fix for Lingui

## Problem

Cloudflare Pages build was failing with the error:

```
"ctx.opts.onMessageExtracted is not a function"
```

This error occurs because the Lingui babel plugin `@lingui/babel-plugin-extract-messages` is being used in the production build environment where it's not properly configured.

## Root Cause

The Lingui extraction plugin expects certain options and callbacks that are not provided in production/web build environments. The plugin is designed for development-time message extraction, not for production builds.

## Solution

### 1. Updated Babel Configuration

**File: `babel.config.js`**

```javascript
/* eslint-disable unicorn/no-anonymous-default-export, no-undef */
module.exports = function (api) {
	api.cache(true)

	// Skip extraction plugin in production builds, tests, or when explicitly disabled
	const skipExtraction =
		process.env.NODE_ENV === 'production' ||
		process.env.SKIP_LINGUI_EXTRACT === 'true' ||
		api.env('test') ||
		api.env('production')

	const plugins = [['react-native-unistyles/plugin', { root: 'src' }]]

	// Only add extraction plugin when not skipped
	if (!skipExtraction) {
		plugins.push('@lingui/babel-plugin-extract-messages')
	}

	return {
		plugins,
		presets: ['babel-preset-expo'],
	}
}
```

### 2. Environment Configuration

**File: `.env.production`**

```
NODE_ENV=production
SKIP_LINGUI_EXTRACT=true
```

### 3. Updated Build Script

**File: `package.json`**

```json
{
	"scripts": {
		"build:web": "SKIP_LINGUI_EXTRACT=true NODE_ENV=production expo export -p web && ./config/update-asset-paths.sh"
	}
}
```

### 4. Static Import Configuration

**File: `src/lib/i18n.ts`**

```typescript
import { i18n } from '@lingui/core'
import { detect, fromNavigator } from '@lingui/detect-locale'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Static imports for web builds
import { messages as enMessages } from '../locales/en/messages'
import { messages as esMessages } from '../locales/es/messages'
import { messages as ptMessages } from '../locales/pt/messages'

export const locales = {
	en: 'English',
	es: 'Español',
	pt: 'Português',
}

export const defaultLocale = 'en'

// Static message catalog for web builds
const messagesCatalog = {
	en: enMessages,
	es: esMessages,
	pt: ptMessages,
}

/**
 * We do a static import of just the catalog that we need
 * @param locale any locale string
 */
export async function dynamicActivate(locale: string) {
	try {
		// Use static imports for web compatibility
		const messages =
			messagesCatalog[locale as keyof typeof messagesCatalog] ||
			messagesCatalog[defaultLocale]

		i18n.load(locale, messages)
		i18n.activate(locale)
	} catch (error) {
		console.warn(
			`Failed to load locale ${locale}, falling back to default`,
			error,
		)
		i18n.load(defaultLocale, messagesCatalog[defaultLocale])
		i18n.activate(defaultLocale)
	}
}

// ... rest of the configuration
```

## Key Changes Made

### 1. **Conditional Plugin Loading**

- The Lingui extraction plugin is only loaded in development mode
- Production builds, tests, and web builds skip the extraction plugin entirely
- Uses environment variables for explicit control

### 2. **Environment Detection**

- Multiple detection methods for different build environments
- Explicit environment variable `SKIP_LINGUI_EXTRACT` for fine control
- Production environment detection via `NODE_ENV`

### 3. **Static Imports for Web**

- Replaced dynamic imports with static imports for web compatibility
- Pre-compiled message catalogs are imported at build time
- Fallback handling for missing locales

### 4. **Build Script Updates**

- Environment variables set in build command
- Clear separation between development and production workflows

## For Cloudflare Pages

### Build Configuration

Set these environment variables in your Cloudflare Pages build settings:

```
NODE_ENV=production
SKIP_LINGUI_EXTRACT=true
```

### Build Command

```bash
npm run build:web
```

Or directly:

```bash
SKIP_LINGUI_EXTRACT=true NODE_ENV=production npx expo export -p web
```

## Development Workflow

### 1. **Extract Messages** (Development only)

```bash
npm run i18n:extract
```

### 2. **Compile Messages** (Before build)

```bash
npm run i18n:compile
```

### 3. **Build for Web**

```bash
npm run build:web
```

## Testing the Fix

### Local Development

```bash
npm start
# Extraction plugin should work normally
```

### Production Build

```bash
npm run build:web
# Should build without "onMessageExtracted" error
```

### Test Suite

```bash
npm test
# Should run with proper mocks
```

## Benefits

1. **Build Compatibility**: Works with Cloudflare Pages and other web hosting platforms
2. **Performance**: No runtime dynamic imports in production
3. **Reliability**: Fallback handling for missing translations
4. **Development Experience**: Full Lingui functionality in development mode

## Troubleshooting

### If build still fails:

1. **Clear cache**: `npm run clean && npm install`
2. **Check environment**: Ensure `NODE_ENV=production` is set
3. **Verify compiled messages**: Run `npm run i18n:compile` before building
4. **Check static imports**: Ensure all message files exist in `src/locales/*/messages.js`

This solution ensures that the Lingui extraction plugin is only used during development while providing full i18n functionality in production builds.
