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
				id: number
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
	<div>{team.name}</div>
	<div>{0}</div>
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
		<Distance
			value={team.members.reduce(
				(acc, member) =>
					acc + member.activities.reduce((acc, activity) => acc + activity.distance, 0),
				0
			)}
		/>
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
	<div class="w-full px-1.5 py-1">
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
					{#if isMember}
						<div class="relative">
							<div class="chipped-corners absolute -top-0.75 left-13 z-10 bg-gold-800 p-0.5">
								<div
									class="chipped-corners bg-gold-500 px-1 py-0.5 text-sm leading-3.5 font-semibold text-gold-800 uppercase"
								>
									{m.yourTeam()}
								</div>
							</div>
							<div class="chipped-corners bg-gold-700 p-0.5">
								<div class="chipped-corners bg-gold-100 p-0.5">
									<div class="chipped-corners bg-gold-600 p-0.5">
										<div class="chipped-corners row bg-brown-300 p-1">
											{@render row(index, team, isMember, memberOfAnyTeam)}
										</div>
									</div>
								</div>
							</div>
						</div>
					{:else}
						<div class="row px-2 py-3.5">
							{@render row(index, team, isMember, memberOfAnyTeam)}
						</div>
					{/if}
				{/each}
			{/if}
		{:catch error}
			<div class="row">
				<div class="col-full text-red-600 text-center">Error loading teams: {error.message}</div>
			</div>
		{/await}
	</div>
</Card>

<CreateTeamDialog bind:this={createTeamDialog} />

<style>
	.row {
		display: grid;
		grid-template-columns: 2.5rem 1fr 4rem 4rem 6rem 1fr;
		align-items: center;

		border-bottom: 1px solid var(--color-brown-200);
		font-weight: 700;
		color: var(--color-brown-800);
	}

	.row:last-child {
		border-bottom: none;
	}

	.row.header {
		font-weight: 600;
		font-size: 0.8rem;
		letter-spacing: 0.05em;
	}

	.col-rank {
		font-family: var(--font-pixel);
		font-weight: 700;
		color: var(--color-brown-450);
		text-align: center;
		font-size: 1.5rem;
	}

	.row > *:last-child {
		text-align: right;
	}
</style>
