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
	<div class="relative">
		{team.name}

		{#if isMember}
			<div class="chipped-corners absolute -top-4 left-7.5 z-10 bg-brown-900 p-0.5">
				<div
					class="chipped-corners bg-brown-600 px-1 py-0.5 text-sm leading-3.5 font-semibold text-nowrap text-sand uppercase"
				>
					{m.yourTeam()}
				</div>
			</div>
		{/if}
	</div>
	<div>{team.points}</div>
	<div class="flex items-center gap-1">
		{#each team.members as member (member.id)}
			{@const avatar = createAvatar(pixelArt, {
				seed: member.user.avatarSeed ?? '',
				size: 32
			}).toDataUri()}
			<div class="chipped-corners bg-brown-450" title={member.user.name}>
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
				<Button onclick={async () => await leave(team.id)} label={m.leaveTeam()} />
			{/if}

			{#if !memberOfAnyTeam}
				<Button onclick={async () => await join(team.id)} label={m.joinTeam()} />
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
			<div class="col-name">{m.teamName()}</div>
			<div class="col-std">{m.points()}</div>
			<div class="col-std">{m.members()}</div>
			<div class="col-std">{m.distance()}</div>
			<div class="col-actions"></div>
		</div>

		{#await data.teams}
			<div class="row"><div class="col-full text-center italic">{m.loading()}</div></div>
		{:then teams}
			{#if teams.length === 0}
				<div class="row"><div class="col-full text-center italic">{m.noTeams()}</div></div>
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
				<div class="col-full text-center">Error loading teams: {error.message}</div>
			</div>
		{/await}
	</div>
</Card>

<CreateTeamDialog bind:this={createTeamDialog} />

<style>
	.row {
		display: grid;
		grid-template-columns: 1rem 1fr 4rem 12rem 4rem 1fr;
		align-items: center;
		justify-items: center;

		border-bottom: 2px solid var(--color-brown-600);
		font-weight: 600;
		font-size: 0.875rem;
		color: var(--color-brown-900);
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

	.row > *:first-child {
		justify-self: start;
	}

	.row > *:last-child {
		justify-self: end;
	}
</style>
