import { useEffect, useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

import { I18nProvider as LinguiI18nProvider } from '@lingui/react'

import { i18n, initI18n } from '@/lib/i18n'

type I18nProviderProps = {
	children: React.ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const setupI18n = () => {
			try {
				initI18n()
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error('Failed to initialize i18n:', error)
			} finally {
				setIsLoading(false)
			}
		}

		setupI18n()
	}, [])

	if (isLoading) {
		return (
			<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
				<ActivityIndicator size="large" />
				<Text>Loading...</Text>
			</View>
		)
	}

	return (
		<LinguiI18nProvider i18n={i18n}>
			{children}
		</LinguiI18nProvider>
	)
}
