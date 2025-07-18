import { Button } from 'react-native'

import { Stack } from 'expo-router'

export default function HomeLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerRight() {
						return <Button title="Add Log" />
					},
					title: 'Logs',
				}}
			/>
		</Stack>
	)
}
