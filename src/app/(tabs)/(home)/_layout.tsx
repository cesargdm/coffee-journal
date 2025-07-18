import { Button } from 'react-native'

import { router, Stack } from 'expo-router'

export default function HomeLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerRight() {
						return (
							<Button
								onPress={() => router.push('/(tabs)/(home)/new-log')}
								title="Add Log"
							/>
						)
					},
					title: 'Logs',
				}}
			/>
			<Stack.Screen
				name="new-log"
				options={{
					presentation: 'modal',
					title: 'New Log',
				}}
			/>
		</Stack>
	)
}
