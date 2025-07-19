import { i18n } from '@lingui/core'
import { detect, fromNavigator } from '@lingui/detect-locale'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const locales = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
}

export const defaultLocale = 'en'

// Pre-compiled message catalog for web builds
const messagesCatalog = {
  en: {
    'About': 'About',
    'Add Log': 'Add Log',
    'Appearance': 'Appearance',
    'Create your first coffee log to start your journey': 'Create your first coffee log to start your journey',
    'Dark Mode': 'Dark Mode',
    'Home': 'Home',
    'Language': 'Language',
    'Logs': 'Logs',
    'New Log': 'New Log',
    'Retronasal': 'Retronasal',
    'Settings': 'Settings',
    'Start your coffee journey by recording your first tasting experience': 'Start your coffee journey by recording your first tasting experience',
    'Tactile': 'Tactile',
    'Tongue': 'Tongue',
    'Use dark theme throughout the app': 'Use dark theme throughout the app',
    'Version': 'Version',
  },
  es: {
    'About': 'Acerca de',
    'Add Log': 'Agregar Registro',
    'Appearance': 'Apariencia',
    'Create your first coffee log to start your journey': 'Crea tu primer registro de café para comenzar tu viaje',
    'Dark Mode': 'Modo Oscuro',
    'Home': 'Inicio',
    'Language': 'Idioma',
    'Logs': 'Registros',
    'New Log': 'Nuevo Registro',
    'Retronasal': 'retronasal',
    'Settings': 'Configuración',
    'Start your coffee journey by recording your first tasting experience': 'Comienza tu viaje cafetero',
    'Tactile': 'táctil',
    'Tongue': 'lengua',
    'Use dark theme throughout the app': 'Usar tema oscuro en toda la aplicación',
    'Version': 'Versión',
  },
  pt: {
    'About': 'Sobre',
    'Add Log': 'Adicionar Registro',
    'Appearance': 'Aparência',
    'Create your first coffee log to start your journey': 'Crie seu primeiro registro de café para começar sua jornada',
    'Dark Mode': 'Modo Escuro',
    'Home': 'Início',
    'Language': 'Idioma',
    'Logs': 'Registros',
    'New Log': 'Novo Registro',
    'Retronasal': 'retronasal',
    'Settings': 'Configurações',
    'Start your coffee journey by recording your first tasting experience': 'Comece sua jornada do café',
    'Tactile': 'tátil',
    'Tongue': 'língua',
    'Use dark theme throughout the app': 'Usar tema escuro em todo o aplicativo',
    'Version': 'Versão',
  },
}

/**
 * We do a static import of just the catalog that we need
 * @param locale any locale string
 */
export function dynamicActivate(locale: string) {
  try {
    // Use static imports for web compatibility
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const messages = messagesCatalog[locale as keyof typeof messagesCatalog] ?? messagesCatalog[defaultLocale]
    
    i18n.load(locale, messages)
    i18n.activate(locale)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`Failed to load locale ${locale}, falling back to default`, error)
    i18n.load(defaultLocale, messagesCatalog[defaultLocale])
    i18n.activate(defaultLocale)
  }
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
export function initI18n() {
  // Try to detect the locale from various sources
  const detectedLocale = detect(
    // Try to get from AsyncStorage first
    async () => {
      try {
        const stored = await AsyncStorage.getItem('locale')
        return stored
      } catch {
        // Return undefined instead of useless undefined
      }
    },
    // Fallback to navigator locale
    fromNavigator(),
    // Final fallback
    defaultLocale
  )

  const locale = Object.keys(locales).includes(detectedLocale || '') ? detectedLocale : defaultLocale

  dynamicActivate(locale || defaultLocale)
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
