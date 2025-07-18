import { Tabs } from 'expo-router'
import { Platform } from 'react-native'

export default function TabLayout() {
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
