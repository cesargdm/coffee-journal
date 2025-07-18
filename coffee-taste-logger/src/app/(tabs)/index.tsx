import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CoffeeLog {
  id: string;
  date: Date;
  coffeeName: string;
  tongueTaste: number;
  retronasal: number;
  mouthTactile: number;
  overallScore: number;
}

// Mock data for now
const mockLogs: CoffeeLog[] = [
  {
    id: '1',
    date: new Date(),
    coffeeName: 'Ethiopian Yirgacheffe',
    tongueTaste: 8,
    retronasal: 9,
    mouthTactile: 7,
    overallScore: 8,
  },
  {
    id: '2',
    date: new Date(Date.now() - 86400000),
    coffeeName: 'Colombian Supremo',
    tongueTaste: 7,
    retronasal: 7,
    mouthTactile: 8,
    overallScore: 7.3,
  },
];

export default function LogsScreen() {
  const renderLogItem = ({ item }: { item: CoffeeLog }) => (
    <TouchableOpacity style={styles.logItem}>
      <View style={styles.logHeader}>
        <Text style={styles.coffeeName}>{item.coffeeName}</Text>
        <Text style={styles.overallScore}>{item.overallScore.toFixed(1)}</Text>
      </View>
      <Text style={styles.date}>
        {item.date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
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
  );

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateText}>No coffee logs yet</Text>
      <Text style={styles.emptyStateSubtext}>Start logging your coffee tasting experiences</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={mockLogs}
        renderItem={renderLogItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={EmptyState}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    padding: theme.spacing.md,
    flexGrow: 1,
  },
  logItem: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  coffeeName: {
    ...theme.typography.h3,
    color: theme.colors.text,
    flex: 1,
  },
  overallScore: {
    ...theme.typography.h2,
    color: theme.colors.primary,
    marginLeft: theme.spacing.sm,
  },
  date: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  scoresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.sm,
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
  scoreValue: {
    ...theme.typography.h3,
    color: theme.colors.text,
  },
  separator: {
    height: theme.spacing.md,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  emptyStateText: {
    ...theme.typography.h2,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  emptyStateSubtext: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: theme.spacing.lg,
    bottom: theme.spacing.lg,
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '600',
  },
}));
