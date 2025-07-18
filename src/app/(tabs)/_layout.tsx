import Tabs from '@/components/Tabs'

export default function TabLayout() {
	return (
		<Tabs screenOptions={{ tabBarActiveTintColor: '#6B4423' }}>
			<Tabs.Screen name="(home)" />
			<Tabs.Screen name="settings" />
		</Tabs>
	)
}
