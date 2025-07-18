import { Button } from 'react-native'

import { Stack, router } from 'expo-router'

export default function HomeLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerRight() {
						return <Button title="Add Log" onPress={() => router.push('/(tabs)/(home)/new-log')} />
					},
					title: 'Logs',
				}}
			/>
			<Stack.Screen
				name="new-log"
				options={{
					title: 'New Log',
					presentation: 'modal',
				}}
			/>
		</Stack>
	)
}
