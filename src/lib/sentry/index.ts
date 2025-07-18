import * as Sentry from '@sentry/react-native'

Sentry.init({
	dsn: 'https://772b83c90a28c7a3c6cee5ef9a7501d1@o4509691195097088.ingest.us.sentry.io/4509691196407808',

	integrations: [
		Sentry.mobileReplayIntegration(),
		Sentry.feedbackIntegration(),
	],

	replaysOnErrorSampleRate: 1,
	// Configure Session Replay
	replaysSessionSampleRate: 0.1,
	// Adds more context data to events (IP address, cookies, user, etc.)
	// For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
	sendDefaultPii: true,

	// uncomment the line below to enable Spotlight (https://spotlightjs.com)
	// spotlight: __DEV__,
})
