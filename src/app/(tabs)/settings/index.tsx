import { useEffect, useState } from 'react'
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native'

import { t } from '@lingui/core/macro'
import { useLingui } from '@lingui/react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native-unistyles'
import { UnistylesRuntime } from 'react-native-unistyles'

import { LanguageSelector } from '@/components/LanguageSelector'
import { getStoredLocale, i18n } from '@/lib/i18n'

export default function SettingsScreen() {
	const isDarkMode = UnistylesRuntime.themeName === 'dark'
	const [currentLocale, setCurrentLocale] = useState(i18n.locale)
	const { _ } = useLingui()

	useEffect(() => {
		const loadCurrentLocale = async () => {
			const stored = await getStoredLocale()
			if (stored) {
				setCurrentLocale(stored)
			}
		}

		void loadCurrentLocale()
	}, [])

	const handleThemeToggle = () => {
		UnistylesRuntime.setTheme(isDarkMode ? 'light' : 'dark')
	}

	const handleLocaleChange = (locale: string) => {
		setCurrentLocale(locale)
	}

	const SettingsSection = ({
		children,
		title,
	}: {
		children: React.ReactNode
		title: string
	}) => (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>{title}</Text>
			{children}
		</View>
	)

	const SettingsItem = ({
		children,
		onPress,
	}: {
		children: React.ReactNode
		onPress?: () => void
	}) => (
		<TouchableOpacity onPress={onPress} style={styles.item}>
			{children}
		</TouchableOpacity>
	)

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<SettingsSection title={_(t`appearance`)}>
					<SettingsItem onPress={handleThemeToggle}>
						<View style={styles.itemContent}>
							<View style={styles.itemLeft}>
								<Text style={styles.itemTitle}>{_(t`dark-mode`)}</Text>
								<Text style={styles.itemSubtitle}>
									{_(t`dark-theme-subtitle`)}
								</Text>
							</View>
							<Switch onValueChange={handleThemeToggle} value={isDarkMode} />
						</View>
					</SettingsItem>
				</SettingsSection>

				<SettingsSection title={_(t`language`)}>
					<SettingsItem>
						<View style={styles.itemContent}>
							<View style={styles.itemLeft}>
								<Text style={styles.itemTitle}>{_(t`language`)}</Text>
							</View>
							<LanguageSelector
								currentLocale={currentLocale}
								onLocaleChange={handleLocaleChange}
							/>
						</View>
					</SettingsItem>
				</SettingsSection>

				<SettingsSection title={_(t`about`)}>
					<SettingsItem>
						<View style={styles.itemContent}>
							<View style={styles.itemLeft}>
								<Text style={styles.itemTitle}>{_(t`version`)}</Text>
							</View>
							<Text style={styles.itemValue}>1.0.0</Text>
						</View>
					</SettingsItem>
				</SettingsSection>
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
	item: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		minHeight: 60,
		padding: theme.spacing.md,
	},
	itemContent: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	itemLeft: {
		flex: 1,
		marginRight: theme.spacing.md,
	},
	itemSubtitle: {
		...theme.typography.caption,
		color: theme.colors.textSecondary,
	},
	itemTitle: {
		...theme.typography.body,
		color: theme.colors.text,
		marginBottom: theme.spacing.xs / 2,
	},
	itemValue: {
		...theme.typography.body,
		color: theme.colors.textSecondary,
	},
	scrollContainer: {
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
}))
