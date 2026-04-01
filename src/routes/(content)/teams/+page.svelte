<script lang="ts">
	import { invalidate } from '$app/navigation'
	import Button from '$lib/components/Button.svelte'
	import Card from '$lib/components/Card.svelte'
	import CreateTeamDialog from '$lib/components/CreateTeamDialog/CreateTeamDialog.svelte'
	import Distance from '$lib/components/Distance.svelte'
	import Hero from '$lib/components/Hero.svelte'
	import { m } from '$lib/paraglide/messages'
	import { createAvatar } from '@dicebear/core'
	import { joinTeam, leaveTeam } from '../data.remote'
	import type { PageProps } from './$types'
	import { pixelArt } from '@dicebear/collection'

	let { data }: PageProps = $props()

	let createTeamDialog = $state<CreateTeamDialog | null>(null)

	type Team = {
		id: string
		name: string
		members: {
			id: string
			teamId: string
			user: {
				name: string
				avatarSeed: string | null
			}
			activities: {
				id: string
				name: string
				userId: string
				distance: number
				movingTime: number | null
				type: string | null
				sportType: string | null
				workoutType: number | null
				deviceName: string | null
				startDate: string | null
				startDateLocal: string | null
				timezone: string | null
				utcOffset: number | null
				locationCity: string | null
				locationState: string | null
				locationCountry: string | null
				polyline: string | null
				maxSpeed: number | null
			}[]
		}[]
		totalDistance: number
		points: number
	}

	async function leave(id: string) {
		await leaveTeam({ id })
		invalidate('teams')
	}

	async function join(id: string) {
		await joinTeam({ id })
		invalidate('teams')
	}
</script>

{#snippet row(index: number, team: Team, isMember: boolean, memberOfAnyTeam: boolean)}
	<div class="col-rank">{index + 1}</div>
	<div class="relative flex h-full items-center">
		{team.name}

		{#if isMember}
			<div class="chipped-corners absolute -top-1 left-7.5 z-10 bg-brown-900 p-0.5">
				<div
					class="chipped-corners bg-brown-600 px-1 py-0.5 text-sm leading-3.5 font-semibold text-nowrap text-sand uppercase"
				>
					{m.yourTeam()}
				</div>
			</div>
		{/if}
	</div>
	<div>{team.points}</div>
	<div class="flex flex-wrap items-center gap-0.5">
		{#each team.members as member (member.id)}
			{@const avatar = createAvatar(pixelArt, {
				seed: member.user.avatarSeed ?? member.user.name ?? member.id,
				size: 32
			}).toDataUri()}
			<div class="chipped-corners bg-brown-300" title={member.user.name}>
				<img src={avatar} alt="Avatar" class="size-8" />
			</div>
		{/each}
	</div>

	<div>
		<Distance value={team.totalDistance} />
	</div>

	<div>
		{#if data.user}
			{#if isMember}
				<Button onclick={async () => await leave(team.id)}>
					<div class="flex items-center gap-1">
						<svg
							width="32"
							height="32"
							fill="none"
							viewBox="0 0 24 24"
							class="md:hidden"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M17.5 12a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm-5.478 2A6.47 6.47 0 0 0 11 17.5c0 1.644.61 3.145 1.617 4.29-.802.141-1.675.21-2.617.21-2.89 0-5.128-.656-6.691-2a3.75 3.75 0 0 1-1.305-2.843v-.907A2.25 2.25 0 0 1 4.254 14h7.768Zm3.071.966-.07.058-.057.07a.5.5 0 0 0 0 .568l.058.069 1.77 1.77-1.768 1.766-.057.07a.5.5 0 0 0 0 .568l.058.07.069.057a.5.5 0 0 0 .568 0l.07-.058 1.766-1.767 1.77 1.77.069.058a.5.5 0 0 0 .568 0l.07-.058.058-.07a.5.5 0 0 0 0-.568l-.058-.07-1.77-1.768 1.772-1.77.058-.07a.5.5 0 0 0 0-.568l-.058-.069-.069-.058a.5.5 0 0 0-.569 0l-.069.058-1.771 1.77-1.77-1.77-.07-.058a.5.5 0 0 0-.492-.043l-.076.043ZM10 2.004a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z"
								fill="currentColor"
							/>
						</svg>

						<span class="max-md:hidden">{m.leaveTeam()}</span>
					</div>
				</Button>
			{/if}

			{#if !memberOfAnyTeam}
				<Button onclick={async () => await join(team.id)}>
					<div class="flex items-center gap-1">
						<svg
							width="32"
							height="32"
							fill="none"
							viewBox="0 0 24 24"
							class="md:hidden"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M11 17.5a6.47 6.47 0 0 1 1.023-3.5h-7.77a2.249 2.249 0 0 0-2.25 2.25v.919c0 .572.18 1.13.511 1.596C4.056 20.929 6.58 22 10 22c.932 0 1.797-.08 2.592-.24A6.475 6.475 0 0 1 11 17.502ZM15 7.005a5 5 0 1 0-10 0 5 5 0 0 0 10 0Z"
								fill="currentColor"
							/><path
								d="M23 17.5a5.5 5.5 0 1 0-11 0 5.5 5.5 0 0 0 11 0Zm-5.59-3.492L17.5 14l.09.008a.5.5 0 0 1 .402.402l.008.09V17h2.504l.09.008a.5.5 0 0 1 .402.402l.008.09-.008.09a.5.5 0 0 1-.402.402l-.09.008H18L18 20.5l-.008.09a.5.5 0 0 1-.402.402L17.5 21l-.09-.008a.5.5 0 0 1-.402-.402L17 20.5V18h-2.496l-.09-.008a.5.5 0 0 1-.402-.402l-.008-.09.008-.09a.5.5 0 0 1 .402-.402l.09-.008H17L17 14.5l.008-.09a.5.5 0 0 1 .402-.402Z"
								fill="currentColor"
							/>
						</svg>

						<span class="max-md:hidden">{m.joinTeam()}</span>
					</div>
				</Button>
			{/if}
		{/if}
	</div>
{/snippet}

<Hero title={m.teams()} />

{#if data.user}
	<div class="mb-1 flex w-full justify-end">
		<Button onclick={() => createTeamDialog?.open()} label={m.createTeam()} />
	</div>
{/if}

<Card>
	<div class="w-full">
		<!-- header row -->
		<div class="row header px-2">
			<div class="col-rank">#</div>
			<div class="col-name">{m.name()}</div>
			<div class="col-std">{m.points()}</div>
			<div class="col-std">{m.members()}</div>
			<div class="col-std">{m.distance()}</div>
			<div class="col-actions"></div>
		</div>

		{#await data.teams}
			<div class="row">
				<div class="col-span-full w-full p-2 text-center italic">{m.loading()}</div>
			</div>
		{:then teams}
			{#if teams.length === 0}
				<div class="row">
					<div class="col-span-full w-full p-2 text-center italic">{m.noTeams()}</div>
				</div>
			{:else}
				{@const memberOfAnyTeam = teams.some((team) =>
					team.members.some((member) => member.id === data.user?.id)
				)}
				{#each teams as team, index (index)}
					{@const isMember = team.members.some((member) => member.id === data.user?.id)}
					{@const displayButtons = data.user && (isMember || !memberOfAnyTeam)}

					<div class={['row px-2', displayButtons ? 'py-2' : 'py-3.5']}>
						{@render row(index, team, isMember, memberOfAnyTeam)}
					</div>
				{/each}
			{/if}
		{:catch error}
			<div class="row">
				<div class="col-span-full p-2 text-center">Error loading teams: {error.message}</div>
			</div>
		{/await}
	</div>
</Card>

<CreateTeamDialog bind:this={createTeamDialog} />

<style>
	.row {
		display: grid;
		grid-template-columns: 1rem 1fr 4rem 1fr 4rem 1fr;
		align-items: center;
		justify-items: center;

		border-bottom: 2px solid var(--color-brown-600);
		font-weight: 600;
		font-size: 0.875rem;
		color: var(--color-brown-900);
	}

	@media screen and (max-width: 640px) {
		.row {
			grid-template-columns: 2rem repeat(5, 1fr);
		}
	}

	.row:last-child {
		border-bottom: none;
	}

	.row.header {
		font-weight: 900;
		font-size: 1rem;
		letter-spacing: 0.05em;
		background-color: oklch(from var(--color-sand) calc(l - 0.05) c h);
	}

	.col-rank {
		font-family: var(--font-pixel);
		font-weight: 700;
		color: var(--color-brown-450);
		text-align: center;
		font-size: 1.5rem;
	}

	.row:nth-child(odd):not(.header) {
		background-color: oklch(from var(--color-sand) calc(l - 0.05) c h);
	}

	.row > *:first-child:not(.col-span-full) {
		justify-self: start;
	}

	.row > *:last-child:not(.col-span-full) {
		justify-self: end;
	}
</style>
