import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import SettingsScreen from '@/app/(tabs)/settings'
import { UnistylesRuntime } from 'react-native-unistyles'

// Get the mocked setTheme function
const mockSetTheme = UnistylesRuntime.setTheme as jest.Mock

describe('SettingsScreen', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('renders correctly', () => {
		const { getByText } = render(<SettingsScreen />)

		// Check if main sections are rendered
		expect(getByText('Appearance')).toBeTruthy()
		expect(getByText('Coffee Logging')).toBeTruthy()
		expect(getByText('Data')).toBeTruthy()
		expect(getByText('About')).toBeTruthy()
	})

	it('displays theme toggle', () => {
		const { getByText } = render(<SettingsScreen />)

		// Check if dark mode toggle is present
		expect(getByText('Dark Mode')).toBeTruthy()
		expect(getByText('Use dark theme throughout the app')).toBeTruthy()
	})

	it('toggles theme when switch is pressed', () => {
		const { getAllByTestId } = render(<SettingsScreen />)

		// Find all switches and get the first one (dark mode toggle)
		const switches = getAllByTestId('switch')
		const themeSwitch = switches[0]

		// Trigger the theme toggle
		fireEvent(themeSwitch, 'onValueChange', true)

		// Check if setTheme was called with the correct value
		expect(mockSetTheme).toHaveBeenCalledWith('dark')
	})

	it('displays coffee logging preferences', () => {
		const { getByText } = render(<SettingsScreen />)

		// Check if coffee logging options are present
		expect(getByText('Default Scoring Range')).toBeTruthy()
		expect(getByText('1-10 scale')).toBeTruthy()
		expect(getByText('Quick Add')).toBeTruthy()
	})

	it('displays app version', () => {
		const { getByText } = render(<SettingsScreen />)

		// Check if version is displayed
		expect(getByText('Version')).toBeTruthy()
		expect(getByText('1.0.0')).toBeTruthy()
	})
})
