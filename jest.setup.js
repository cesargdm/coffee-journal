// Mock Expo winter runtime
globalThis.__ExpoImportMetaRegistry = {}

// Mock react-native-nitro-modules
jest.mock('react-native-nitro-modules', () => ({
	NitroModules: {
		// Add any specific mocks if needed
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
	Tabs: () => null,
	useGlobalSearchParams: () => ({}),
	useLocalSearchParams: () => ({}),
	usePathname: () => '/',
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
