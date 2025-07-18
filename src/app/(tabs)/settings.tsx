import React from 'react'
import { View, Text, Switch, TouchableOpacity, ScrollView } from 'react-native'
import { StyleSheet, UnistylesRuntime } from 'react-native-unistyles'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SettingsScreen() {
	const isDarkMode = UnistylesRuntime.themeName === 'dark'

	const toggleTheme = () => {
		UnistylesRuntime.setTheme(isDarkMode ? 'light' : 'dark')
	}

	const SettingItem = ({
		title,
		subtitle,
		value,
		onValueChange,
		showSwitch = false,
	}: {
		title: string
		subtitle?: string
		value?: boolean
		onValueChange?: (value: boolean) => void
		showSwitch?: boolean
	}) => (
		<TouchableOpacity
			style={styles.settingItem}
			onPress={() => !showSwitch && onValueChange?.(!value)}
			activeOpacity={showSwitch ? 1 : 0.7}
		>
			<View style={styles.settingTextContainer}>
				<Text style={styles.settingTitle}>{title}</Text>
				{subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
			</View>
			{showSwitch && (
				<Switch
					testID="switch"
					value={value}
					onValueChange={onValueChange}
					trackColor={{ false: '#E0E0E0', true: '#6B4423' }}
					thumbColor={value ? '#FFFFFF' : '#f4f3f4'}
				/>
			)}
		</TouchableOpacity>
	)

	const SettingSection = ({
		title,
		children,
	}: {
		title: string
		children: React.ReactNode
	}) => (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>{title}</Text>
			<View style={styles.sectionContent}>{children}</View>
		</View>
	)

	return (
		<SafeAreaView style={styles.container} edges={['bottom']}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<SettingSection title="Appearance">
					<SettingItem
						title="Dark Mode"
						subtitle="Use dark theme throughout the app"
						value={isDarkMode}
						onValueChange={toggleTheme}
						showSwitch
					/>
				</SettingSection>

				<SettingSection title="About">
					<SettingItem title="Version" subtitle="1.0.0" />
				</SettingSection>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create((theme) => ({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
	},
	scrollContent: {
		paddingBottom: theme.spacing.xl,
	},
	section: {
		marginTop: theme.spacing.lg,
	},
	sectionTitle: {
		...theme.typography.caption,
		color: theme.colors.textSecondary,
		textTransform: 'uppercase',
		marginHorizontal: theme.spacing.md,
		marginBottom: theme.spacing.sm,
	},
	sectionContent: {
		backgroundColor: theme.colors.surface,
		borderRadius: theme.borderRadius.md,
		marginHorizontal: theme.spacing.md,
		overflow: 'hidden',
	},
	settingItem: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: theme.spacing.md,
		minHeight: 60,
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
	settingSubtitle: {
		...theme.typography.caption,
		color: theme.colors.textSecondary,
	},
	divider: {
		height: 1,
		backgroundColor: theme.colors.border,
		marginHorizontal: theme.spacing.md,
	},
}))
