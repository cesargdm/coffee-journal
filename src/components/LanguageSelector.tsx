import { Text, View } from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import * as DropdownMenu from 'zeego/dropdown-menu'

import { dynamicActivate, locales, saveLocale } from '@/lib/i18n'

type LanguageSelectorProps = {
	currentLocale: string
	onLocaleChange?: (locale: string) => void
}

export function LanguageSelector({
	currentLocale,
	onLocaleChange,
}: LanguageSelectorProps) {
	const handleLanguageChange = async (locale: string) => {
		if (locale !== currentLocale) {
			await dynamicActivate(locale)
			await saveLocale(locale)
			onLocaleChange?.(locale)
		}
	}

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<View
					style={{
						alignItems: 'center',
						backgroundColor: '#f5f5f5',
						borderRadius: 8,
						flexDirection: 'row',
						justifyContent: 'space-between',
						minHeight: 48,
						paddingHorizontal: 16,
						paddingVertical: 12,
					}}
				>
					<Text style={{ color: '#333', fontSize: 16 }}>
						{locales[currentLocale as keyof typeof locales]}
					</Text>
					<Ionicons color="#666" name="chevron-down" size={20} />
				</View>
			</DropdownMenu.Trigger>

			<DropdownMenu.Content>
				{Object.entries(locales).map(([locale, label]) => (
					<DropdownMenu.Item
						key={locale}
						onSelect={() => handleLanguageChange(locale)}
					>
						<DropdownMenu.ItemTitle>{label}</DropdownMenu.ItemTitle>
						{currentLocale === locale && (
							<DropdownMenu.ItemIcon ios={{ name: 'checkmark' }} />
						)}
					</DropdownMenu.Item>
				))}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	)
}
