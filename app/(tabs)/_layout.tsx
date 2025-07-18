import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { BottomTabBar } from 'react-native-bottom-tabs';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Logs',
          tabBarIcon: () => Platform.select({
            ios: { sfSymbol: 'list.bullet' },
            android: require('../../assets/list-icon.png'),
          }),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: () => Platform.select({
            ios: { sfSymbol: 'gearshape' },
            android: require('../../assets/settings-icon.png'),
          }),
        }}
      />
    </Tabs>
  );
}