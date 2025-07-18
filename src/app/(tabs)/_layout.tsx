import { Tabs } from 'expo-router'
import { Platform, TouchableOpacity, Text } from 'react-native'

export default function TabLayout() {
	const handleCreateLog = () => {
		// TODO: Navigate to create log screen
	}

	return (
		<Tabs
			screenOptions={{
				headerShown: true,
				tabBarActiveTintColor: '#6B4423',
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Logs',
					tabBarIcon: ({ color }) =>
						Platform.select({
							ios: { sfSymbol: 'list.bullet', color },
							android: require('../../../assets/list-icon.png'),
						}),
					headerRight: () => (
						<TouchableOpacity
							onPress={handleCreateLog}
							style={{
								marginRight: 16,
								backgroundColor: '#6B4423',
								paddingHorizontal: 12,
								paddingVertical: 6,
								borderRadius: 16,
							}}
						>
							<Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>
								+ Add Log
							</Text>
						</TouchableOpacity>
					),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: 'Settings',
					tabBarIcon: ({ color }) =>
						Platform.select({
							ios: { sfSymbol: 'gearshape', color },
							android: require('../../../assets/settings-icon.png'),
						}),
				}}
			/>
		</Tabs>
	)
}
