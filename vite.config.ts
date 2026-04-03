import { paraglideVitePlugin } from '@inlang/paraglide-js'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import { sveltekit } from '@sveltejs/kit/vite'

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			strategy: ['url', 'cookie', 'baseLocale'],
			urlPatterns: [
				{
					pattern: '/',
					localized: [
						['en', '/en'],
						['hu', '/']
					]
				},
				{
					pattern: '/activities/sync',
					localized: [
						['en', '/activities/sync'],
						['hu', '/tevekenysegek/szinkronizalas']
					]
				},
				{
					pattern: '/activities',
					localized: [
						['en', '/activities'],
						['hu', '/tevekenysegek']
					]
				},
				{
					pattern: '/auth',
					localized: [
						['en', '/auth'],
						['hu', '/azonositas']
					]
				},
				{
					pattern: '/teams',
					localized: [
						['en', '/teams'],
						['hu', '/csapatok']
					]
				},
				{
					pattern: '/rules',
					localized: [
						['en', '/rules'],
						['hu', '/szabalyok']
					]
				},
				{
					pattern: '/leaderboards',
					localized: [
						['en', '/leaderboards'],
						['hu', '/ranglista']
					]
				}
			]
		})
	],
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**']
				}
			},

			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
})
