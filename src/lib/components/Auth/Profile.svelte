<script lang="ts">
	import { enhance } from '$app/forms'
	import Button from '$lib/components/Button.svelte'
	import Card from '$lib/components/Card.svelte'
	import { createAvatar } from '@dicebear/core'
	import { pixelArt } from '@dicebear/collection'
	import type { User } from 'better-auth'

	type Props = {
		user: User
		accounts: {
			scopes: string[]
			id: string
			createdAt: Date
			updatedAt: Date
			userId: string
			providerId: string
			accountId: string
		}[]
	}

	let { user, accounts }: Props = $props()

	const stravaAccount = $derived(accounts.find((acc) => acc.providerId === 'strava'))

	let seed = $state('KOMI')

	const avatar = $derived(
		createAvatar(pixelArt, {
			seed,
			size: 128
		}).toDataUri()
	)

	function randomizeAvatar() {
		seed = Math.random().toString(36).substring(2, 10)
	}
</script>

<Card>
	<div class="space-y-4 p-2">
		<p class="text-stone-600 text-sm">Signed in as <strong>{user.name}</strong></p>
		<p class="text-stone-500 text-sm">{user.email}</p>

		<hr class="border-stone-200" />

		<img src={avatar} alt="Avatar" class="h-24 w-24 rounded-full" />
		<Button label="Randomize Avatar" onclick={randomizeAvatar} class="w-full" />

		<hr class="border-stone-200" />

		<div class="space-y-2">
			{#if stravaAccount}
				{#if stravaAccount.providerId === 'strava'}
					<p class="text-sm font-medium">Strava Connection</p>
					<p class="text-green-700 text-sm">Connected as {stravaAccount.accountId}</p>
					<form method="POST" action="?/unlinkStrava" use:enhance>
						<Button label="Disconnect Strava" type="submit" class="bg-red-50 text-red-700 w-full" />
					</form>
				{/if}
			{:else}
				<p class="text-stone-500 text-sm">Not connected</p>
				<form method="POST" action="?/linkStrava" use:enhance>
					<Button
						label="Connect Strava"
						type="submit"
						class="bg-orange-50 text-orange-700 w-full"
					/>
				</form>
			{/if}
		</div>

		<hr class="border-stone-200" />

		<form method="POST" action="?/signOut" use:enhance>
			<Button label="Sign out" type="submit" class="w-full" />
		</form>
	</div>
</Card>
