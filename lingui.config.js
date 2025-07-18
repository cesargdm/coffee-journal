/* eslint-env node */
/* eslint-disable no-undef */
/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
	catalogs: [
		{
			exclude: ['**/node_modules/**'],
			include: ['src'],
			path: 'src/locales/{locale}/messages',
		},
	],
	fallbackLocales: {
		default: 'en',
	},
	format: 'po',
	formatOptions: {
		origins: false,
	},
	locales: ['en', 'es', 'pt'],
	orderBy: 'messageId',
	pseudoLocale: 'pseudo',
	runtimeConfigModule: {
		i18n: ['@lingui/core', 'i18n'],
		Trans: ['@lingui/react', 'Trans'],
	},
	sourceLocale: 'en',
}
