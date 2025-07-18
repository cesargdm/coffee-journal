import { render } from '@testing-library/react-native'

import LogsScreen from '@/app/(tabs)/(home)/index'

describe('LogsScreen', () => {
	it('renders correctly', () => {
		const { getByText } = render(<LogsScreen />)

		// Check if the screen renders with mock data
		expect(getByText('Ethiopian Yirgacheffe')).toBeTruthy()
		expect(getByText('Colombian Supremo')).toBeTruthy()
	})

	it('displays coffee scores correctly', () => {
		const { getByText } = render(<LogsScreen />)

		// Check if scores are displayed
		expect(getByText('8.0')).toBeTruthy() // Overall score for Ethiopian
		expect(getByText('7.3')).toBeTruthy() // Overall score for Colombian
	})

	it('displays score labels', () => {
		const { getAllByText } = render(<LogsScreen />)

		// Check if score labels appear (should appear twice, once for each coffee)
		expect(getAllByText('Tongue')).toHaveLength(2)
		expect(getAllByText('Retronasal')).toHaveLength(2)
		expect(getAllByText('Tactile')).toHaveLength(2)
	})

	it('renders the floating action button', () => {
		const { getByText } = render(<LogsScreen />)

		// Check if FAB is rendered
		expect(getByText('+')).toBeTruthy()
	})
})
