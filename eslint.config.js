const eslintPluginPrettier = require('eslint-plugin-prettier')
const typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin')
const typescriptEslintParser = require('@typescript-eslint/parser')

module.exports = [
	{
		ignores: [
			'node_modules/**',
			'.expo/**',
			'dist/**',
			'build/**',
			'*.lock',
			'bun.lockb',
		],
	},
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			parser: typescriptEslintParser,
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			'@typescript-eslint': typescriptEslintPlugin,
			prettier: eslintPluginPrettier,
		},
		rules: {
			'prettier/prettier': 'error',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_' },
			],
			'no-console': ['warn', { allow: ['warn', 'error'] }],
		},
	},
]
