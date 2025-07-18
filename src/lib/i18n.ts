import { i18n } from '@lingui/core'
import { detect, fromNavigator } from '@lingui/detect-locale'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Static imports for web builds
import { messages as enMessages } from '../locales/en/messages'
import { messages as esMessages } from '../locales/es/messages'
import { messages as ptMessages } from '../locales/pt/messages'

export const locales = {
	en: 'English',
	es: 'Español',
	pt: 'Português',
}

export const defaultLocale = 'en'

// Static message catalog for web builds
const messagesCatalog = {
	en: enMessages,
	es: esMessages,
	pt: ptMessages,
}

/**
 * We do a static import of just the catalog that we need
 * @param locale any locale string
 */
export async function dynamicActivate(locale: string) {
	try {
		// Use static imports for web compatibility
		const messages = messagesCatalog[locale as keyof typeof messagesCatalog] || messagesCatalog[defaultLocale]

		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		i18n.load(locale, messages)
		i18n.activate(locale)
	} catch (error) {
		// eslint-disable-next-line no-console
		console.warn(`Failed to load locale ${locale}, falling back to default`, error)
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		i18n.load(defaultLocale, messagesCatalog[defaultLocale])
		i18n.activate(defaultLocale)
	}
}

/**
 * Get the current locale from AsyncStorage
 */
export async function getStoredLocale(): Promise<string | null> {
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
				return undefined
			}
		},
		// Fallback to navigator locale
		fromNavigator(),
		// Final fallback
		defaultLocale
	)

	const locale = Object.keys(locales).includes(detectedLocale || '') ? detectedLocale : defaultLocale

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
