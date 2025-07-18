import { StyleSheet } from 'react-native-unistyles'

const lightTheme = {
	colors: {
		background: '#FFFFFF',
		surface: '#F5F5F5',
		primary: '#6B4423',
		secondary: '#8B6F47',
		text: '#1A1A1A',
		textSecondary: '#666666',
		border: '#E0E0E0',
		error: '#D32F2F',
		success: '#388E3C',
	},
	spacing: {
		xs: 4,
		sm: 8,
		md: 16,
		lg: 24,
		xl: 32,
	},
	typography: {
		h1: {
			fontSize: 32,
			fontWeight: '700' as const,
		},
		h2: {
			fontSize: 24,
			fontWeight: '600' as const,
		},
		h3: {
			fontSize: 20,
			fontWeight: '600' as const,
		},
		body: {
			fontSize: 16,
			fontWeight: '400' as const,
		},
		caption: {
			fontSize: 14,
			fontWeight: '400' as const,
		},
	},
	borderRadius: {
		sm: 4,
		md: 8,
		lg: 16,
		full: 9999,
	},
}

const darkTheme = {
	...lightTheme,
	colors: {
		background: '#121212',
		surface: '#1E1E1E',
		primary: '#D2691E',
		secondary: '#DEB887',
		text: '#FFFFFF',
		textSecondary: '#B0B0B0',
		border: '#333333',
		error: '#EF5350',
		success: '#66BB6A',
	},
}

type AppThemes = {
	light: typeof lightTheme
	dark: typeof darkTheme
}

declare module 'react-native-unistyles' {
	export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
	themes: {
		light: lightTheme,
		dark: darkTheme,
	},
	settings: {
		adaptiveThemes: true,
	},
})

export { lightTheme, darkTheme }
