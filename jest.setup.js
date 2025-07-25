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

// Mock Lingui runtime
jest.mock('@lingui/react', () => ({
	I18nProvider: ({ children }) => children,
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
		back: jest.fn(),
		push: jest.fn(),
		replace: jest.fn(),
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
	clear: jest.fn(() => Promise.resolve()),
	getItem: jest.fn(() => Promise.resolve(null)),
	removeItem: jest.fn(() => Promise.resolve()),
	setItem: jest.fn(() => Promise.resolve()),
}))

// Mock Zeego
jest.mock('zeego/dropdown-menu', () => ({
	Content: ({ children }) => children,
	Item: ({ children }) => children,
	ItemIcon: () => null,
	ItemTitle: ({ children }) => children,
	Root: ({ children }) => children,
	Trigger: ({ children }) => children,
}))

// Mock our i18n lib
jest.mock('@/lib/i18n', () => ({
	defaultLocale: 'en',
	dynamicActivate: jest.fn(),
	getStoredLocale: jest.fn(() => Promise.resolve('en')),
	i18n: {
		_: (id) => id,
		activate: jest.fn(),
		load: jest.fn(),
		locale: 'en',
	},
	initI18n: jest.fn(),
	locales: {
		en: 'English',
		es: 'Español',
		pt: 'Português',
	},
	saveLocale: jest.fn(),
}))

// Mock LanguageSelector
jest.mock('@/components/LanguageSelector', () => ({
	LanguageSelector: () => null,
}))

// Mock I18nProvider
jest.mock('@/components/I18nProvider', () => ({
	I18nProvider: ({ children }) => children,
}))
