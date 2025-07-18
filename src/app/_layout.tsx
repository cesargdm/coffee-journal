import * as Sentry from '@sentry/react-native'
import { Stack } from 'expo-router'

function RootLayout() {
	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
		</Stack>
	)
}

export default Sentry.wrap(RootLayout)
