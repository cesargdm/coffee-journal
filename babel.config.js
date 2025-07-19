/* eslint-disable unicorn/no-anonymous-default-export, no-undef */
module.exports = function (api) {
	api.cache(true)

	return {
		plugins: [
			['react-native-unistyles/plugin', { root: 'src' }]
		],
		presets: ['babel-preset-expo'],
	}
}
