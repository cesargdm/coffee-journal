import { Button } from 'react-native'

import { useLingui } from '@lingui/react'
import { router, Stack } from 'expo-router'

export default function HomeLayout() {
	const { _ } = useLingui()

	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerRight() {
						return (
							<Button
								onPress={() => router.push('/(tabs)/(home)/new-log')}
								title={_('Add Log')}
							/>
						)
					},
					title: _('Logs'),
				}}
			/>
			<Stack.Screen
				name="new-log"
				options={{
					presentation: 'modal',
					title: _('New Log'),
				}}
			/>
		</Stack>
	)
}
