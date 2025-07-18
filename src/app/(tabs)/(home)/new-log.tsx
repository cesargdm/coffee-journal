import {
	Alert,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import { useForm } from '@tanstack/react-form'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native-unistyles'
import { z } from 'zod'

import type { StandardSchemaV1Issue } from '@tanstack/react-form'

// Zod schema for form validation
const coffeeLogSchema = z.object({
	coffeeName: z
		.string()
		.min(1, 'Coffee name is required')
		.max(100, 'Coffee name too long'),
	mouthTactile: z
		.number()
		.min(1, 'Score must be at least 1')
		.max(10, 'Score must be at most 10'),
	notes: z.string().optional(),
	retronasal: z
		.number()
		.min(1, 'Score must be at least 1')
		.max(10, 'Score must be at most 10'),
	tongueTaste: z
		.number()
		.min(1, 'Score must be at least 1')
		.max(10, 'Score must be at most 10'),
})

type CoffeeLogForm = z.infer<typeof coffeeLogSchema>

export default function NewLogScreen() {
	const form = useForm({
		defaultValues: {
			coffeeName: '',
			mouthTactile: 5,
			notes: '',
			retronasal: 5,
			tongueTaste: 5,
		} as CoffeeLogForm,
		onSubmit({ value }) {
			try {
				// Calculate overall score as average of the three scores
				const overallScore =
					(value.tongueTaste + value.retronasal + value.mouthTactile) / 3

				// Here you would typically save to your data store
				// For now, we'll just show a success message
				Alert.alert(
					'Success',
					`Coffee log created!\nOverall Score: ${overallScore.toFixed(1)}`,
					[
						{
							onPress: () => router.back(),
							text: 'OK',
						},
					],
				)
			} catch {
				Alert.alert('Error', 'Failed to create coffee log. Please try again.')
			}
		},
	})

	const ScoreSlider = ({
		error,
		label,
		onChange,
		value,
	}: {
		error?: StandardSchemaV1Issue | string | undefined
		label: string
		onChange: (value: number) => void
		value: number
	}) => (
		<View style={styles.scoreContainer}>
			<View style={styles.scoreHeader}>
				<Text style={styles.scoreLabel}>{label}</Text>
				<Text style={styles.scoreValue}>{value}/10</Text>
			</View>
			<View style={styles.scoreSlider}>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
					<TouchableOpacity
						key={score}
						onPress={() => onChange(score)}
						style={[
							styles.scoreButton,
							value === score && styles.scoreButtonActive,
						]}
					>
						<Text
							style={[
								styles.scoreButtonText,
								value === score && styles.scoreButtonTextActive,
							]}
						>
							{score}
						</Text>
					</TouchableOpacity>
				))}
			</View>
			{/* eslint-disable-next-line @typescript-eslint/no-base-to-string */}
			{error && <Text style={styles.errorText}>{error.toString()}</Text>}
		</View>
	)

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={styles.scrollView}
			>
				<View style={styles.content}>
					<Text style={styles.title}>New Coffee Log</Text>
					<Text style={styles.subtitle}>
						Record your coffee tasting experience
					</Text>

					{/* Coffee Name Input */}
					<form.Field
						name="coffeeName"
						validators={{
							onChange: coffeeLogSchema.shape.coffeeName,
						}}
					>
						{(field) => (
							<View style={styles.inputContainer}>
								<Text style={styles.inputLabel}>Coffee Name</Text>
								<View style={styles.inputWrapper}>
									<Ionicons
										color="#8B6F47"
										name="cafe"
										size={20}
										style={styles.inputIcon}
									/>
									<TextInput
										onChangeText={field.handleChange}
										placeholder="Enter coffee name"
										placeholderTextColor="#B0B0B0"
										style={styles.textInput}
										value={field.state.value}
									/>
								</View>
								{field.state.meta.errors.length > 0 && (
									<Text style={styles.errorText}>
										{/* eslint-disable-next-line @typescript-eslint/no-base-to-string */}
										{field.state.meta.errors.at(0)?.toString()}
									</Text>
								)}
							</View>
						)}
					</form.Field>

					{/* Tongue Taste Score */}
					<form.Field
						name="tongueTaste"
						validators={{
							onChange: coffeeLogSchema.shape.tongueTaste,
						}}
					>
						{(field) => (
							<ScoreSlider
								error={field.state.meta.errors[0]}
								label="Tongue Taste"
								onChange={field.handleChange}
								value={field.state.value}
							/>
						)}
					</form.Field>

					{/* Retronasal Score */}
					<form.Field
						name="retronasal"
						validators={{
							onChange: coffeeLogSchema.shape.retronasal,
						}}
					>
						{(field) => (
							<ScoreSlider
								error={field.state.meta.errors[0]}
								label="Retronasal"
								onChange={field.handleChange}
								value={field.state.value}
							/>
						)}
					</form.Field>

					{/* Mouth Tactile Score */}
					<form.Field
						name="mouthTactile"
						validators={{
							onChange: coffeeLogSchema.shape.mouthTactile,
						}}
					>
						{(field) => (
							<ScoreSlider
								error={field.state.meta.errors[0]}
								label="Mouth Tactile"
								onChange={field.handleChange}
								value={field.state.value}
							/>
						)}
					</form.Field>

					{/* Notes Input */}
					<form.Field name="notes">
						{(field) => (
							<View style={styles.inputContainer}>
								<Text style={styles.inputLabel}>Notes (Optional)</Text>
								<View style={styles.inputWrapper}>
									<Ionicons
										color="#8B6F47"
										name="document-text"
										size={20}
										style={styles.inputIcon}
									/>
									<TextInput
										multiline
										numberOfLines={4}
										onChangeText={field.handleChange}
										placeholder="Add any notes about this coffee..."
										placeholderTextColor="#B0B0B0"
										style={[styles.textInput, styles.notesInput]}
										textAlignVertical="top"
										value={field.state.value}
									/>
								</View>
							</View>
						)}
					</form.Field>

					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting] as const}
					>
						{([canSubmit, isSubmitting]) => (
							<TouchableOpacity
								disabled={!canSubmit || isSubmitting}
								onPress={form.handleSubmit}
								style={[
									styles.submitButton,
									!canSubmit && styles.submitButtonDisabled,
								]}
							>
								<Ionicons
									color={canSubmit ? '#FFFFFF' : '#B0B0B0'}
									name="checkmark-circle"
									size={20}
									style={styles.submitIcon}
								/>
								<Text
									style={[
										styles.submitButtonText,
										!canSubmit && styles.submitButtonTextDisabled,
									]}
								>
									{isSubmitting ? 'Creating Log...' : 'Create Log'}
								</Text>
							</TouchableOpacity>
						)}
					</form.Subscribe>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create((theme) => ({
	container: {
		backgroundColor: theme.colors.background,
		flex: 1,
	},
	content: {
		padding: theme.spacing.md,
	},
	errorText: {
		...theme.typography.caption,
		color: theme.colors.error,
		marginTop: theme.spacing.xs,
	},
	inputContainer: {
		marginBottom: theme.spacing.lg,
	},
	inputIcon: {
		marginRight: theme.spacing.sm,
	},
	inputLabel: {
		...theme.typography.body,
		color: theme.colors.text,
		fontWeight: '600',
		marginBottom: theme.spacing.sm,
	},
	inputWrapper: {
		alignItems: 'center',
		backgroundColor: theme.colors.surface,
		borderColor: theme.colors.border,
		borderRadius: theme.borderRadius.md,
		borderWidth: 1,
		flexDirection: 'row',
		paddingHorizontal: theme.spacing.md,
		paddingVertical: theme.spacing.sm,
	},
	notesInput: {
		height: 100,
		textAlignVertical: 'top',
	},
	scoreButton: {
		alignItems: 'center',
		backgroundColor: theme.colors.surface,
		borderColor: theme.colors.border,
		borderRadius: theme.borderRadius.sm,
		borderWidth: 1,
		height: 40,
		justifyContent: 'center',
		width: 40,
	},
	scoreButtonActive: {
		backgroundColor: theme.colors.primary,
		borderColor: theme.colors.primary,
	},
	scoreButtonText: {
		...theme.typography.body,
		color: theme.colors.text,
		fontWeight: '600',
	},
	scoreButtonTextActive: {
		color: '#FFFFFF',
	},
	scoreContainer: {
		marginBottom: theme.spacing.lg,
	},
	scoreHeader: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: theme.spacing.sm,
	},
	scoreLabel: {
		...theme.typography.body,
		color: theme.colors.text,
		fontWeight: '600',
	},
	scoreSlider: {
		flexDirection: 'row',
		gap: theme.spacing.xs,
		justifyContent: 'space-between',
	},
	scoreValue: {
		...theme.typography.body,
		color: theme.colors.primary,
		fontWeight: '700',
	},
	scrollView: {
		flex: 1,
	},
	submitButton: {
		alignItems: 'center',
		backgroundColor: theme.colors.primary,
		borderRadius: theme.borderRadius.md,
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: theme.spacing.xl,
		paddingVertical: theme.spacing.md,
	},
	submitButtonDisabled: {
		backgroundColor: theme.colors.border,
	},
	submitButtonText: {
		...theme.typography.body,
		color: '#FFFFFF',
		fontWeight: '600',
	},
	submitButtonTextDisabled: {
		color: '#B0B0B0',
	},
	submitIcon: {
		marginRight: theme.spacing.sm,
	},
	subtitle: {
		...theme.typography.body,
		color: theme.colors.textSecondary,
		marginBottom: theme.spacing.xl,
		textAlign: 'center',
	},
	textInput: {
		...theme.typography.body,
		color: theme.colors.text,
		flex: 1,
		paddingVertical: theme.spacing.xs,
	},
	title: {
		...theme.typography.h1,
		color: theme.colors.text,
		marginBottom: theme.spacing.sm,
		textAlign: 'center',
	},
}))
