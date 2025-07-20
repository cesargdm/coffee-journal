/* eslint-env node */
/* eslint-disable no-undef */
/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
	catalogs: [
		{
			exclude: [
				'**/node_modules/**',
				'**/dist/**',
				'**/build/**',
				'**/.expo/**',
			],
			include: ['src'],
			path: 'src/locales/{locale}/messages',
		},
	],
	compileNamespace: 'es',
	extractBabelOptions: {
		presets: ['babel-preset-expo'],
	},
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
