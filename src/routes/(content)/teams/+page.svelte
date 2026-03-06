<script lang="ts">
	import Button from '$lib/components/Button.svelte'
	import Card from '$lib/components/Card.svelte'
	import CreateTeamDialog from '$lib/components/CreateTeamDialog/CreateTeamDialog.svelte'
	import Distance from '$lib/components/Distance.svelte'
	import { m } from '$lib/paraglide/messages'
	import { joinTeam, leaveTeam } from '../data.remote'
	import type { PageProps } from './$types'

	let { data }: PageProps = $props()

	let createTeamDialog = $state<CreateTeamDialog | null>(null)
</script>

<Button onclick={() => createTeamDialog?.open()} label={m.createTeam()} />

<Card>
	<div class="w-full px-1.5 py-1">
		<table class="w-full">
			<thead>
				<tr class="">
					<th>#</th>
					<th>{m.teamName()}</th>
					<th>{m.points()}</th>
					<th>{m.members()}</th>
					<th>{m.distance()}</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{#await data.teams}
					<tr>
						<td colspan="6" class="text-center italic">{m.loading()}</td>
					</tr>
				{:then teams}
					{#if teams.length === 0}
						<tr>
							<td colspan="6" class="text-center italic">{m.noTeams()}</td>
						</tr>
					{:else}
						{#each teams as team, index (index)}
							<tr class:odd={index % 2 === 0}>
								<td class="rank">{index + 1}</td>
								<td>{team.name}</td>
								<td>{0}</td>
								<td>{team.members.length}</td>
								<td>
									<Distance
										value={team.members.reduce(
											(acc, member) =>
												acc +
												member.activities.reduce((acc, activity) => acc + activity.distance, 0),
											0
										)}
									/>
								</td>
								<td class="actions">
									<Button
										onclick={async () => await joinTeam({ id: team.id })}
										label={m.joinTeam()}
									/>
									<Button
										onclick={async () => await leaveTeam({ id: team.id })}
										label={m.leaveTeam()}
									/>
								</td>
							</tr>
						{/each}
					{/if}
				{:catch error}
					<tr>
						<td colspan="6" class="text-red-600 text-center"
							>Error loading teams: {error.message}</td
						>
					</tr>
				{/await}
			</tbody>
		</table>
	</div>
</Card>

<CreateTeamDialog bind:this={createTeamDialog} />

<style>
	th {
		padding: 0.5rem 0.75rem;
		text-align: left;
		font-weight: 600;
		font-size: 0.8rem;
		letter-spacing: 0.05em;
		border-bottom: 1px solid var(--color-brown-200);
	}

	td {
		font-weight: 700;
		padding: 0.5rem 0.75rem;
		border-bottom: 1px solid var(--color-brown-200);
		color: var(--color-brown-800);
	}

	tbody tr:hover td {
		background-color: var(--color-brown-300);
	}

	tbody tr:last-child td {
		border-bottom: none;
	}

	td.rank {
		font-family: var(--font-pixel);
		font-weight: 700;
		color: var(--color-brown-450);
		text-align: center;
		width: 2.5rem;
		font-size: 1.5rem;
	}

	td.actions {
		text-align: right;
	}
</style>
