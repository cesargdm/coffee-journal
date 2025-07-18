import type React from 'react'
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native-unistyles'
import { UnistylesRuntime } from 'react-native-unistyles'

export default function SettingsScreen() {
	const isDarkMode = UnistylesRuntime.themeName === 'dark'

	const toggleTheme = () => {
		UnistylesRuntime.setTheme(isDarkMode ? 'light' : 'dark')
	}

	const SettingItem = ({
		onValueChange,
		showSwitch = false,
		subtitle,
		title,
		value,
	}: {
		onValueChange?: (value: boolean) => void
		showSwitch?: boolean
		subtitle?: string
		title: string
		value?: boolean
	}) => (
		<TouchableOpacity
			activeOpacity={showSwitch ? 1 : 0.7}
			onPress={() => !showSwitch && onValueChange?.(!value)}
			style={styles.settingItem}
		>
			<View style={styles.settingTextContainer}>
				<Text style={styles.settingTitle}>{title}</Text>
				{subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
			</View>
			{showSwitch && (
				<Switch
					onValueChange={onValueChange}
					testID="switch"
					thumbColor={value ? '#FFFFFF' : '#f4f3f4'}
					trackColor={{ false: '#E0E0E0', true: '#6B4423' }}
					value={value}
				/>
			)}
		</TouchableOpacity>
	)

	const SettingSection = ({
		children,
		title,
	}: {
		children: React.ReactNode
		title: string
	}) => (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>{title}</Text>
			<View style={styles.sectionContent}>{children}</View>
		</View>
	)

	return (
		<SafeAreaView edges={['bottom']} style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<SettingSection title="Appearance">
					<SettingItem
						onValueChange={toggleTheme}
						showSwitch
						subtitle="Use dark theme throughout the app"
						title="Dark Mode"
						value={isDarkMode}
					/>
				</SettingSection>

				<SettingSection title="About">
					<SettingItem subtitle="1.0.0" title="Version" />
				</SettingSection>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create((theme) => ({
	container: {
		backgroundColor: theme.colors.background,
		flex: 1,
	},
	divider: {
		backgroundColor: theme.colors.border,
		height: 1,
		marginHorizontal: theme.spacing.md,
	},
	scrollContent: {
		paddingBottom: theme.spacing.xl,
	},
	section: {
		marginTop: theme.spacing.lg,
	},
	sectionContent: {
		backgroundColor: theme.colors.surface,
		borderRadius: theme.borderRadius.md,
		marginHorizontal: theme.spacing.md,
		overflow: 'hidden',
	},
	sectionTitle: {
		...theme.typography.caption,
		color: theme.colors.textSecondary,
		marginBottom: theme.spacing.sm,
		marginHorizontal: theme.spacing.md,
		textTransform: 'uppercase',
	},
	settingItem: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		minHeight: 60,
		padding: theme.spacing.md,
	},
	settingSubtitle: {
		...theme.typography.caption,
		color: theme.colors.textSecondary,
	},
	settingTextContainer: {
		flex: 1,
		marginRight: theme.spacing.md,
	},
	settingTitle: {
		...theme.typography.body,
		color: theme.colors.text,
		marginBottom: theme.spacing.xs / 2,
	},
}))
