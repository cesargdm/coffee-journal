import { FlatList, Text, TouchableOpacity, View } from 'react-native'

import { useLingui } from '@lingui/react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native-unistyles'

import { useLogStore } from '@/lib/stores/logStore'

import type { CoffeeLog } from '@/lib/stores/logStore'

export default function LogsScreen() {
	const { _ } = useLingui()
	const logs = useLogStore((state) => state.logs)

	const renderLogItem = ({ item }: { item: CoffeeLog }) => {
		// Extract coffee name from notes if available
		const coffeeName = item.notes.split('\n')[0] || `${item.brewMethod} Coffee`
		
		return (
			<TouchableOpacity style={styles.logItem}>
				<View style={styles.logHeader}>
					<Text style={styles.coffeeName}>{coffeeName}</Text>
					<Text style={styles.overallScore}>{item.rating.toFixed(1)}</Text>
				</View>
				<View style={styles.scoreRow}>
					<View style={styles.scoreItem}>
						<Text style={styles.scoreLabel}>{_('Method')}</Text>
						<Text style={styles.scoreValue}>{item.brewMethod}</Text>
					</View>
					<View style={styles.scoreItem}>
						<Text style={styles.scoreLabel}>{_('Time')}</Text>
						<Text style={styles.scoreValue}>{item.brewTime}s</Text>
					</View>
					<View style={styles.scoreItem}>
						<Text style={styles.scoreLabel}>{_('Temp')}</Text>
						<Text style={styles.scoreValue}>{item.temperature}°C</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}

	const renderEmptyState = () => (
		<View style={styles.emptyState}>
			<Text style={styles.emptyTitle}>
				{_('Create your first coffee log to start your journey')}
			</Text>
			<Text style={styles.emptySubtitle}>
				{_(
					'Start your coffee journey by recording your first tasting experience',
				)}
			</Text>
		</View>
	)

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				contentContainerStyle={styles.listContainer}
				data={logs}
				keyExtractor={(item) => item.id}
				ListEmptyComponent={renderEmptyState}
				renderItem={renderLogItem}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create((theme) => ({
	coffeeName: {
		color: theme.colors.text,
		flex: 1,
		fontSize: 18,
		fontWeight: '600',
	},
	container: {
		backgroundColor: theme.colors.background,
		flex: 1,
	},
	emptyState: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 32,
	},
	emptySubtitle: {
		color: theme.colors.textSecondary,
		fontSize: 16,
		lineHeight: 24,
		textAlign: 'center',
	},
	emptyTitle: {
		color: theme.colors.text,
		fontSize: 20,
		fontWeight: '600',
		marginBottom: 8,
		textAlign: 'center',
	},
	listContainer: {
		flexGrow: 1,
		padding: 16,
	},
	logHeader: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 12,
	},
	logItem: {
		backgroundColor: theme.colors.surface,
		borderRadius: 12,
		elevation: 3,
		marginBottom: 12,
		padding: 16,
		shadowColor: '#000',
		shadowOffset: {
			height: 2,
			width: 0,
		},
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	overallScore: {
		color: theme.colors.primary,
		fontSize: 24,
		fontWeight: 'bold',
	},
	scoreItem: {
		alignItems: 'center',
		flex: 1,
	},
	scoreLabel: {
		color: theme.colors.textSecondary,
		fontSize: 12,
		marginBottom: 4,
		textTransform: 'uppercase',
	},
	scoreRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	scoreValue: {
		color: theme.colors.text,
		fontSize: 16,
		fontWeight: '500',
	},
}))
