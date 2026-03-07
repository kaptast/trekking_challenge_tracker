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
	let changedAvatar = $state(false)

	const avatar = $derived(
		createAvatar(pixelArt, {
			seed,
			size: 80
		}).toDataUri()
	)

	function randomizeAvatar() {
		seed = Math.random().toString(36).substring(2, 10)
		changedAvatar = true
	}

	function saveAvatar() {
		changedAvatar = false
	}
</script>

<div class="profile-grid grid gap-4">
	<Card class="account">
		<div class="account-grid grid w-full gap-1 p-1">
			<div class="avatar chipped-corners relative size-20 bg-brown-450">
				<img src={avatar} alt="Avatar" class="size-20" />

				<button
					class="absolute inset-0 grid cursor-pointer place-items-center bg-black text-[#fff] opacity-0 transition-opacity hover:opacity-40"
					onclick={randomizeAvatar}
					title="Randomize Avatar"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						viewBox="0 0 24 24"
						class="w-12"
						><g
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							><path d="M18 4l3 3l-3 3"></path><path d="M18 20l3-3l-3-3"></path><path
								d="M3 7h3a5 5 0 0 1 5 5a5 5 0 0 0 5 5h5"
							></path><path
								d="M21 7h-5a4.978 4.978 0 0 0-2.998.998M9 16.001A4.984 4.984 0 0 1 6 17H3"
							></path></g
						></svg
					>
				</button>

				{#if changedAvatar}
					<button
						onclick={saveAvatar}
						title="Save avatar"
						class="chipped-corners absolute top-0 right-0 z-10 cursor-pointer bg-brown-200 p-0.5 text-brown-600 transition-colors hover:bg-brown-100"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							viewBox="0 0 24 24"
							class="w-5"
							><path
								d="M17 3H3v18h18V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3s3 1.34 3 3s-1.34 3-3 3zm3-10H5V5h10v4z"
								fill="currentColor"
							></path></svg
						>
					</button>
				{/if}
			</div>

			<div class="user-name text-2xl font-semibold uppercase">{user.name}</div>
			<div class="email text-base font-medium">{user.email}</div>

			<div class="team chipped-corners bg-brown-200 p-1">Team</div>
		</div>

		<!-- <div class="space-y-2">
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
		</form> -->
	</Card>

	<Card class="badges"></Card>
	<Card class="stats"></Card>
	<Card class="activities"></Card>
	<Card class="last-activity"></Card>
</div>

<style>
	.profile-grid {
		grid-template-areas:
			'account badges badges'
			'stats badges badges'
			'activities activities last-activity';
	}

	.profile-grid :global(.account) {
		grid-area: account;
	}

	.account-grid {
		grid-template-areas:
			'avatar user-name'
			'avatar email'
			'team team';
	}

	.avatar {
		grid-area: avatar;
	}

	.user-name {
		grid-area: user-name;
	}

	.email {
		grid-area: email;
	}

	.team {
		grid-area: team;
	}

	.profile-grid :global(.badges) {
		grid-area: badges;
	}

	.profile-grid :global(.stats) {
		grid-area: stats;
	}

	.profile-grid :global(.activities) {
		grid-area: activities;
	}

	.profile-grid :global(.last-activity) {
		grid-area: last-activity;
	}
</style>
