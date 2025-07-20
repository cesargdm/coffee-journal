import { useLingui } from '@lingui/react'

import Tabs from '@/components/Tabs'

export default function TabLayout() {
	const { _ } = useLingui()

	return (
		<Tabs
			screenOptions={{
				// @ts-expect-error - headerShown is not a valid prop for Tabs.Screen
				headerShown: false,
				tabBarActiveTintColor: '#6B4423',
			}}
		>
			<Tabs.Screen
				name="(home)"
				options={{
					title: _('Home'),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: _('Settings'),
				}}
			/>
		</Tabs>
	)
}
