import { Stack } from 'expo-router'
import { Button } from 'react-native'

export default function HomeLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: 'Logs',
					headerRight() {
						return <Button title="Add Log" />
					},
				}}
			/>
		</Stack>
	)
}
