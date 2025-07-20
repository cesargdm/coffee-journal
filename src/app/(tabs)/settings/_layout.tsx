import { useLingui } from '@lingui/react'
import { Stack } from 'expo-router'

export default function SettingsLayout() {
	const { _ } = useLingui()

	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: _('Settings'),
				}}
			/>
		</Stack>
	)
}
