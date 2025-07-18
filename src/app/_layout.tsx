import * as Sentry from '@sentry/react-native'
import { Stack } from 'expo-router'

import { I18nProvider } from '@/components/I18nProvider'

function RootLayout() {
	return (
		<I18nProvider>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
		</I18nProvider>
	)
}

export default Sentry.wrap(RootLayout)
