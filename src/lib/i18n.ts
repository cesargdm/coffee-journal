import { i18n } from '@lingui/core'
import { detect, fromNavigator } from '@lingui/detect-locale'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const locales = {
	en: 'English',
	es: 'Español',
	pt: 'Português',
}

export const defaultLocale = 'en'

/**
 * We do a dynamic import of just the catalog that we need
 * @param locale any locale string
 */
export async function dynamicActivate(locale: string) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { messages } = await import(`../locales/${locale}/messages`)
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	i18n.load(locale, messages)
	i18n.activate(locale)
}

/**
 * Get the current locale from AsyncStorage
 */
export async function getStoredLocale(): Promise<null | string> {
	try {
		return await AsyncStorage.getItem('locale')
	} catch (error) {
		// eslint-disable-next-line no-console
		console.warn('Failed to get stored locale:', error)
		return null
	}
}

/**
 * Initialize i18n with the default locale
 */
export async function initI18n() {
	// Try to detect the locale from various sources
	const detectedLocale = detect(
		// Try to get from AsyncStorage first
		async () => {
			try {
				const stored = await AsyncStorage.getItem('locale')
				return stored || undefined
			} catch {
				return
			}
		},
		// Fallback to navigator locale
		fromNavigator(),
		// Final fallback
		defaultLocale,
	)

	const locale = Object.keys(locales).includes(detectedLocale || '')
		? detectedLocale
		: defaultLocale

	await dynamicActivate(locale || defaultLocale)
	return locale || defaultLocale
}

/**
 * Save the current locale to AsyncStorage
 */
export async function saveLocale(locale: string) {
	try {
		await AsyncStorage.setItem('locale', locale)
	} catch (error) {
		// eslint-disable-next-line no-console
		console.warn('Failed to save locale:', error)
	}
}

export { i18n } from '@lingui/core'
