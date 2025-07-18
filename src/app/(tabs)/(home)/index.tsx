import { FlatList, Text, TouchableOpacity, View } from 'react-native'

import { Trans } from '@lingui/react'
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
			<View style={styles.scoreRow}>
				<View style={styles.scoreItem}>
					<Text style={styles.scoreLabel}>
						<Trans id="tongue" />
					</Text>
					<Text style={styles.scoreValue}>{item.tongueTaste.toFixed(1)}</Text>
				</View>
				<View style={styles.scoreItem}>
					<Text style={styles.scoreLabel}>
						<Trans id="retronasal" />
					</Text>
					<Text style={styles.scoreValue}>{item.retronasal.toFixed(1)}</Text>
				</View>
				<View style={styles.scoreItem}>
					<Text style={styles.scoreLabel}>
						<Trans id="tactile" />
					</Text>
					<Text style={styles.scoreValue}>{item.mouthTactile.toFixed(1)}</Text>
				</View>
			</View>
		</TouchableOpacity>
	)

	const renderEmptyState = () => (
		<View style={styles.emptyState}>
			<Text style={styles.emptyTitle}>
				<Trans id="create-first-log" />
			</Text>
			<Text style={styles.emptySubtitle}>
				<Trans id="start-coffee-journey" />
			</Text>
		</View>
	)

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				contentContainerStyle={styles.listContainer}
				data={mockLogs}
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
