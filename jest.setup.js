// Mock Expo winter runtime
global.__ExpoImportMetaRegistry = {}

// Mock react-native-nitro-modules
jest.mock('react-native-nitro-modules', () => ({
	NitroModules: {
		// Add any specific mocks if needed
	},
}))

// Mock react-native-unistyles
jest.mock('react-native-unistyles', () => ({
	StyleSheet: {
		create: (styles) => styles,
	},
	UnistylesRuntime: {
		themeName: 'light',
		setTheme: jest.fn(),
		addPlugin: jest.fn(),
		removePlugin: jest.fn(),
		updateTheme: jest.fn(),
		setAdaptiveThemes: jest.fn(),
		setRootViewBackgroundColor: jest.fn(),
	},
	createStyleSheet: (styles) => styles,
}))

// Mock SafeAreaView
jest.mock('react-native-safe-area-context', () => {
	const React = require('react')
	return {
		SafeAreaView: ({ children }) =>
			React.createElement('SafeAreaView', null, children),
		useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
		SafeAreaProvider: ({ children }) => children,
	}
})

// Mock expo-router
jest.mock('expo-router', () => ({
	useRouter: () => ({
		push: jest.fn(),
		replace: jest.fn(),
		back: jest.fn(),
	}),
	useLocalSearchParams: () => ({}),
	useGlobalSearchParams: () => ({}),
	useSegments: () => [],
	usePathname: () => '/',
	Link: ({ children }) => children,
	Stack: {
		Screen: () => null,
	},
	Tabs: () => null,
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
	loadAsync: jest.fn(),
	isLoaded: jest.fn(() => true),
}))

jest.mock('expo-linking', () => ({
	createURL: jest.fn(),
	openURL: jest.fn(),
}))

// Setup fetch mock
global.fetch = jest.fn()
