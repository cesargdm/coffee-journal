import { StyleSheet } from 'react-native-unistyles'

const lightTheme = {
	borderRadius: {
		full: 9999,
		lg: 16,
		md: 8,
		sm: 4,
	},
	colors: {
		background: '#FFFFFF',
		border: '#E0E0E0',
		error: '#D32F2F',
		primary: '#6B4423',
		secondary: '#8B6F47',
		success: '#388E3C',
		surface: '#F5F5F5',
		text: '#1A1A1A',
		textSecondary: '#666666',
	},
	spacing: {
		lg: 24,
		md: 16,
		sm: 8,
		xl: 32,
		xs: 4,
	},
	typography: {
		body: {
			fontSize: 16,
			fontWeight: '400' as const,
		},
		caption: {
			fontSize: 14,
			fontWeight: '400' as const,
		},
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
	},
}

const darkTheme = {
	...lightTheme,
	colors: {
		background: '#121212',
		border: '#333333',
		error: '#EF5350',
		primary: '#D2691E',
		secondary: '#DEB887',
		success: '#66BB6A',
		surface: '#1E1E1E',
		text: '#FFFFFF',
		textSecondary: '#B0B0B0',
	},
}

const breakpoints = {
	xs: 0,
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
	superLarge: 2000,
	tvLike: 4000,
} as const

const themes = {
	dark: darkTheme,
	light: lightTheme,
}

type AppThemes = typeof themes

declare module 'react-native-unistyles' {
	export interface UnistylesThemes extends AppThemes {}
	// export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
	settings: {
		adaptiveThemes: true,
	},
	themes,
	breakpoints,
})

export { darkTheme, lightTheme }
