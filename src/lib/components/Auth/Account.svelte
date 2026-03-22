<script lang="ts">
	import { pixelArt } from '@dicebear/collection'
	import { createAvatar } from '@dicebear/core'
	import type { User } from 'better-auth'
	import Card from '$lib/components/Card.svelte'
	import { enhance } from '$app/forms'
	import Button from '$lib/components/Button.svelte'
	import { m } from '$lib/paraglide/messages'
	import { untrack } from 'svelte'
	import { invalidateAll } from '$app/navigation'
	import { saveAvatarSeed } from './account.remote'

	type Props = {
		user: User
		avatarSeed: string | null | undefined
		team: Promise<{
			id: string
			name: string
		}> | null
	}

	let { user, avatarSeed, team }: Props = $props()

	let seed = $state(untrack(() => avatarSeed ?? user.name ?? user.id))
	let changedAvatar = $state(false)

	$effect(() => {
		if (!changedAvatar) {
			seed = avatarSeed ?? user.name ?? user.id
		}
	})

	const avatar = $derived(
		createAvatar(pixelArt, {
			seed,
			size: 128
		}).toDataUri()
	)

	function randomizeAvatar() {
		seed = Math.random().toString(36).substring(2, 10)
		changedAvatar = true
	}

	async function saveAvatar() {
		await saveAvatarSeed({ seed })
		changedAvatar = false
		await invalidateAll()
	}
</script>

<Card class="account">
	<div class={['account-grid grid size-full gap-1 p-1', Boolean(team) && 'has-team']}>
		<div class="avatar chipped-corners relative size-32 bg-brown-300">
			<img src={avatar} alt={m.avatar()} class="size-32" />

			<button
				class="bg-black absolute inset-0 grid cursor-pointer place-items-center text-[#fff] opacity-0 transition-opacity hover:opacity-40"
				onclick={randomizeAvatar}
				title={m.randomizeAvatar()}
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
						></path><path d="M21 7h-5a4.978 4.978 0 0 0-2.998.998M9 16.001A4.984 4.984 0 0 1 6 17H3"
						></path></g
					></svg
				>
			</button>

			{#if changedAvatar}
				<button
					onclick={saveAvatar}
					title={m.saveAvatar()}
					class="chipped-corners bg-brown-200 hover:bg-brown-100 absolute top-0 right-0 z-10 cursor-pointer p-0.5 text-brown-600 transition-colors"
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

		<div class="user-name text-brown-800 text-2xl font-semibold uppercase">
			{user.name}
		</div>

		<form class="sign-out" method="POST" action="?/signOut" use:enhance>
			<Button label={m.logout()} type="submit" />
		</form>

		<div class="email text-brown-800 text-base font-medium">{user.email}</div>

		{#await team then teamData}
			{#if teamData}
				<div
					class="team chipped-corners bg-brown-300/50 p-1 font-pixel text-xl font-bold text-brown-900"
				>
					{teamData.name}
				</div>
			{/if}
		{/await}
	</div>
</Card>

<style>
	:global(.account) {
		grid-area: account;
	}

	.account-grid {
		grid-template-columns: 8rem 1fr;
		grid-template-rows: auto auto auto;
		grid-template-areas:
			'avatar user-name'
			'avatar sign-out'
			'avatar email';
	}
	.account-grid.has-team {
		grid-template-columns: 8rem 1fr;
		grid-template-rows: auto auto auto 1fr;
		grid-template-areas:
			'avatar user-name'
			'avatar sign-out'
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
</style>
