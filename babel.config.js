/* eslint-disable unicorn/no-anonymous-default-export, no-undef */
module.exports = function (api) {
	api.cache(true)

	// Skip extraction plugin in production builds, tests, or when explicitly disabled
	const skipExtraction = 
		process.env.NODE_ENV === 'production' ||
		process.env.SKIP_LINGUI_EXTRACT === 'true' ||
		api.env('test') ||
		api.env('production')

	const plugins = [
		['react-native-unistyles/plugin', { root: 'src' }]
	]

	// Only add extraction plugin when not skipped
	if (!skipExtraction) {
		plugins.push('@lingui/babel-plugin-extract-messages')
	}

	return {
		plugins,
		presets: ['babel-preset-expo'],
	}
}
