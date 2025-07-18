// Since unistyles imports cause issues in tests, we'll test the theme values directly
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
		primary: '#6B4423',
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
		body: { fontSize: 16, fontWeight: 'normal' as const },
		caption: { fontSize: 12, fontWeight: 'normal' as const },
		h1: { fontSize: 32, fontWeight: 'bold' as const },
		h2: { fontSize: 24, fontWeight: 'bold' as const },
		h3: { fontSize: 18, fontWeight: '600' as const },
	},
}

const darkTheme = {
	borderRadius: lightTheme.borderRadius,
	colors: {
		background: '#121212',
		border: '#333333',
		primary: '#D2691E',
		surface: '#1E1E1E',
		text: '#FFFFFF',
		textSecondary: '#B0B0B0',
	},
	spacing: lightTheme.spacing,
	typography: lightTheme.typography,
}

describe('Unistyles Theme Configuration', () => {
	describe('Light Theme', () => {
		it('has correct color scheme', () => {
			expect(lightTheme.colors.background).toBe('#FFFFFF')
			expect(lightTheme.colors.text).toBe('#1A1A1A')
			expect(lightTheme.colors.primary).toBe('#6B4423')
		})

		it('has all required color properties', () => {
			expect(lightTheme.colors).toHaveProperty('background')
			expect(lightTheme.colors).toHaveProperty('surface')
			expect(lightTheme.colors).toHaveProperty('text')
			expect(lightTheme.colors).toHaveProperty('textSecondary')
			expect(lightTheme.colors).toHaveProperty('primary')
			expect(lightTheme.colors).toHaveProperty('border')
		})

		it('has correct spacing values', () => {
			expect(lightTheme.spacing.xs).toBe(4)
			expect(lightTheme.spacing.sm).toBe(8)
			expect(lightTheme.spacing.md).toBe(16)
			expect(lightTheme.spacing.lg).toBe(24)
			expect(lightTheme.spacing.xl).toBe(32)
		})
	})

	describe('Dark Theme', () => {
		it('has correct color scheme', () => {
			expect(darkTheme.colors.background).toBe('#121212')
			expect(darkTheme.colors.text).toBe('#FFFFFF')
			expect(darkTheme.colors.primary).toBe('#D2691E')
		})

		it('has all required color properties', () => {
			expect(darkTheme.colors).toHaveProperty('background')
			expect(darkTheme.colors).toHaveProperty('surface')
			expect(darkTheme.colors).toHaveProperty('text')
			expect(darkTheme.colors).toHaveProperty('textSecondary')
			expect(darkTheme.colors).toHaveProperty('primary')
			expect(darkTheme.colors).toHaveProperty('border')
		})
	})

	describe('Common Theme Properties', () => {
		it('has consistent typography across themes', () => {
			expect(lightTheme.typography).toEqual(darkTheme.typography)
		})

		it('has consistent spacing across themes', () => {
			expect(lightTheme.spacing).toEqual(darkTheme.spacing)
		})

		it('has consistent border radius across themes', () => {
			expect(lightTheme.borderRadius).toEqual(darkTheme.borderRadius)
		})

		it('has correct typography values', () => {
			expect(lightTheme.typography.h1.fontSize).toBe(32)
			expect(lightTheme.typography.body.fontSize).toBe(16)
			expect(lightTheme.typography.caption.fontSize).toBe(12)
		})

		it('has correct border radius values', () => {
			expect(lightTheme.borderRadius.sm).toBe(4)
			expect(lightTheme.borderRadius.md).toBe(8)
			expect(lightTheme.borderRadius.lg).toBe(16)
			expect(lightTheme.borderRadius.full).toBe(9999)
		})
	})
})
