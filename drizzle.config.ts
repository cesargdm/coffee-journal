import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
	dbCredentials: {
		accountId: process.env.CLOUDFLARE_ACCOUNT_ID as string,
		databaseId: process.env.CLOUDFLARE_DATABASE_ID as string,
		token: process.env.CLOUDFLARE_D1_TOKEN as string,
	},
	dialect: 'sqlite',
	driver: 'd1-http',
	out: './drizzle',
	schema: './src/db/schema.ts',
})
