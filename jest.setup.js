/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { jest } from '@jest/globals'

// Mock Expo winter runtime
globalThis.__ExpoImportMetaRegistry = {}

// Mock react-native-nitro-modules
jest.mock('react-native-nitro-modules', () => ({
	NitroModules: {
		// Add any specific mocks if needed
	},
}))

// Mock Lingui
jest.mock('@lingui/core', () => ({
	i18n: {
		_: (id) => id,
		activate: jest.fn(),
		load: jest.fn(),
		locale: 'en',
	},
}))

jest.mock('@lingui/react', () => ({
	I18nProvider: ({ children }) => children,
	Trans: ({ id, children }) => children || id,
	useLingui: () => ({
		_: (id) => id,
		i18n: {
			_: (id) => id,
			activate: jest.fn(),
			load: jest.fn(),
			locale: 'en',
		},
	}),
}))

jest.mock('@lingui/core/macro', () => ({
	t: (strings, ...values) => {
		if (typeof strings === 'string') return strings
		if (strings && strings.raw) {
			return strings.raw.reduce((acc, str, i) => acc + str + (values[i] || ''), '')
		}
		return strings
	},
}))

// Mock react-native-unistyles
jest.mock('react-native-unistyles', () => ({
	createStyleSheet: (styles) => styles,
	StyleSheet: {
		create: (styles) => styles,
	},
	UnistylesRuntime: {
		addPlugin: jest.fn(),
		removePlugin: jest.fn(),
		setAdaptiveThemes: jest.fn(),
		setRootViewBackgroundColor: jest.fn(),
		setTheme: jest.fn(),
		themeName: 'light',
		updateTheme: jest.fn(),
	},
}))

// Mock SafeAreaView
jest.mock('react-native-safe-area-context', () => {
	const React = require('react')
	return {
		SafeAreaProvider: ({ children }) => children,
		SafeAreaView: ({ children }) =>
			React.createElement('SafeAreaView', null, children),
		useSafeAreaInsets: () => ({ bottom: 0, left: 0, right: 0, top: 0 }),
	}
})

// Mock expo-router
jest.mock('expo-router', () => ({
	Link: ({ children }) => children,
	Stack: {
		Screen: () => null,
	},
	Tabs: {
		Screen: () => null,
	},
	useRouter: () => ({
		push: jest.fn(),
		replace: jest.fn(),
		back: jest.fn(),
	}),
	useSegments: () => [],
}))

// Mock expo-constants
jest.mock('expo-constants', () => ({
	expoConfig: {
		name: 'coffee-taste-logger',
		slug: 'coffee-taste-logger',
	},
}))

// Mock expo modules that might be used
jest.mock('expo-font', () => ({
	isLoaded: jest.fn(() => true),
	loadAsync: jest.fn(),
}))

jest.mock('expo-linking', () => ({
	createURL: jest.fn(),
	openURL: jest.fn(),
}))

// Setup fetch mock
globalThis.fetch = jest.fn()

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
	getItem: jest.fn(() => Promise.resolve(null)),
	setItem: jest.fn(() => Promise.resolve()),
	removeItem: jest.fn(() => Promise.resolve()),
	clear: jest.fn(() => Promise.resolve()),
}))

// Mock Zeego
jest.mock('zeego/dropdown-menu', () => ({
	Root: ({ children }) => children,
	Trigger: ({ children }) => children,
	Content: ({ children }) => children,
	Item: ({ children }) => children,
	ItemTitle: ({ children }) => children,
	ItemIcon: () => null,
}))

// Mock our i18n lib
jest.mock('@/lib/i18n', () => ({
	locales: {
		en: 'English',
		es: 'Español',
		pt: 'Português',
	},
	defaultLocale: 'en',
	dynamicActivate: jest.fn(),
	initI18n: jest.fn(),
	saveLocale: jest.fn(),
	getStoredLocale: jest.fn(() => Promise.resolve('en')),
	i18n: {
		_: (id) => id,
		activate: jest.fn(),
		load: jest.fn(),
		locale: 'en',
	},
}))

// Mock LanguageSelector
jest.mock('@/components/LanguageSelector', () => ({
	LanguageSelector: () => null,
}))

// Mock I18nProvider
jest.mock('@/components/I18nProvider', () => ({
	I18nProvider: ({ children }) => children,
}))
