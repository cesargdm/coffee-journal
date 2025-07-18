import { FlatList, Text, TouchableOpacity, View } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native-unistyles'

type CoffeeLog = {
	coffeeName: string
	date: Date
	id: string
	mouthTactile: number
	overallScore: number
	retronasal: number
	tongueTaste: number
}

// No mock data - start with empty state
const mockLogs: CoffeeLog[] = []

export default function LogsScreen() {
	const renderLogItem = ({ item }: { item: CoffeeLog }) => (
		<TouchableOpacity style={styles.logItem}>
			<View style={styles.logHeader}>
				<Text style={styles.coffeeName}>{item.coffeeName}</Text>
				<Text style={styles.overallScore}>{item.overallScore.toFixed(1)}</Text>
			</View>
			<Text style={styles.date}>
				{item.date.toLocaleDateString('en-US', {
					day: 'numeric',
					month: 'short',
					year: 'numeric',
				})}
			</Text>
			<View style={styles.scoresContainer}>
				<View style={styles.scoreItem}>
					<Text style={styles.scoreLabel}>Tongue</Text>
					<Text style={styles.scoreValue}>{item.tongueTaste}</Text>
				</View>
				<View style={styles.scoreItem}>
					<Text style={styles.scoreLabel}>Retronasal</Text>
					<Text style={styles.scoreValue}>{item.retronasal}</Text>
				</View>
				<View style={styles.scoreItem}>
					<Text style={styles.scoreLabel}>Tactile</Text>
					<Text style={styles.scoreValue}>{item.mouthTactile}</Text>
				</View>
			</View>
		</TouchableOpacity>
	)

	const EmptyState = () => (
		<View style={styles.emptyState}>
			<Text style={styles.emptyStateText}>Create your first log</Text>
			<Text style={styles.emptyStateSubtext}>
				Start your coffee journey by recording your first tasting experience
			</Text>
		</View>
	)

	return (
		<SafeAreaView edges={['bottom']} style={styles.container}>
			<FlatList
				contentContainerStyle={styles.listContent}
				data={mockLogs}
				ItemSeparatorComponent={() => <View style={styles.separator} />}
				keyExtractor={(item) => item.id}
				ListEmptyComponent={EmptyState}
				renderItem={renderLogItem}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create((theme) => ({
	coffeeName: {
		...theme.typography.h3,
		color: theme.colors.text,
		flex: 1,
	},
	container: {
		backgroundColor: theme.colors.background,
		flex: 1,
	},
	date: {
		...theme.typography.caption,
		color: theme.colors.textSecondary,
		marginBottom: theme.spacing.sm,
	},
	emptyState: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: theme.spacing.xl,
	},
	emptyStateSubtext: {
		...theme.typography.body,
		color: theme.colors.textSecondary,
		textAlign: 'center',
	},
	emptyStateText: {
		...theme.typography.h2,
		color: theme.colors.text,
		marginBottom: theme.spacing.sm,
		textAlign: 'center',
	},
	listContent: {
		flexGrow: 1,
		padding: theme.spacing.md,
	},
	logHeader: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: theme.spacing.xs,
	},
	logItem: {
		backgroundColor: theme.colors.surface,
		borderRadius: theme.borderRadius.md,
		padding: theme.spacing.md,
	},
	overallScore: {
		...theme.typography.h2,
		color: theme.colors.primary,
		marginLeft: theme.spacing.sm,
	},
	scoreItem: {
		alignItems: 'center',
		flex: 1,
	},
	scoreLabel: {
		...theme.typography.caption,
		color: theme.colors.textSecondary,
		marginBottom: theme.spacing.xs,
	},
	scoresContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: theme.spacing.sm,
	},
	scoreValue: {
		...theme.typography.h3,
		color: theme.colors.text,
	},
	separator: {
		height: theme.spacing.md,
	},
}))
