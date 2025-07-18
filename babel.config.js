module.exports = function (api) {
	api.cache(true)
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'react-native-unistyles/plugin',
				{
					root: 'src',
				},
			],
			[
				'module-resolver',
				{
					root: ['./src'],
					alias: {
						'@': './src',
						'@components': './src/components',
						'@styles': './src/styles',
						'@app': './src/app',
					},
				},
			],
		],
	}
}
