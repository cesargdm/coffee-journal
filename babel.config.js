/* eslint-disable unicorn/no-anonymous-default-export, no-undef */
module.exports = function (api) {
	const isTest = api.env('test')
	api.cache(true)

	return {
		plugins: [
			['react-native-unistyles/plugin', { root: 'src' }],
			...(isTest ? [] : ['@lingui/babel-plugin-extract-messages']),
		],
		presets: ['babel-preset-expo'],
	}
}
