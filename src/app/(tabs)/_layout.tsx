import { useLingui } from '@lingui/react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Platform } from 'react-native'
import { UnistylesRuntime } from 'react-native-unistyles'

import Tabs from '@/components/Tabs'

export default function TabLayout() {
	const { _ } = useLingui()
	const theme = UnistylesRuntime.themeName

	return (
		<Tabs
			screenOptions={{
				// @ts-expect-error - headerShown is not a valid prop for Tabs.Screen
				headerShown: false,
				tabBarActiveTintColor: theme === 'dark' ? '#E34530' : '#E34530',
				tabBarInactiveTintColor: theme === 'dark' ? '#B0B0B0' : '#666666',
			}}
		>
			<Tabs.Screen
				name="(home)"
				options={{
					title: _('Home'),
					tabBarIcon: ({ color, size }) => {
						if (Platform.OS === 'ios') {
							return <FontAwesome6 name="house" size={size} color={color} />
						} else if (Platform.OS === 'android') {
							return <MaterialCommunityIcons name="home" size={size} color={color} />
						}
						return <FontAwesome6 name="house" size={size} color={color} />
					},
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: _('Settings'),
					tabBarIcon: ({ color, size }) => {
						if (Platform.OS === 'ios') {
							return <FontAwesome6 name="gear" size={size} color={color} />
						} else if (Platform.OS === 'android') {
							return <MaterialCommunityIcons name="cog" size={size} color={color} />
						}
						return <FontAwesome6 name="gear" size={size} color={color} />
					},
				}}
			/>
		</Tabs>
	)
}
