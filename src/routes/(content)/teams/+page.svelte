<script lang="ts">
	import Distance from '$lib/components/Distance.svelte'
	import { m } from '$lib/paraglide/messages'
	import { joinTeam, leaveTeam } from '../data.remote'
	import type { PageProps } from './$types'

	let { data }: PageProps = $props()
</script>

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Points</th>
			<th>Members</th>
			<th>Distance</th>
			<th>Actions</th>
		</tr>
	</thead>
	<tbody>
		{#await data.teams}
			<tr>
				<td colspan="5">{m.loading()}</td>
			</tr>
		{:then teams}
			{#if teams.length === 0}
				<tr>
					<td colspan="5">{m.noTeams()}</td>
				</tr>
			{:else}
				{#each teams as team}
					<tr>
						<td>{team.name}</td>
						<td>
							{0}
						</td>
						<td>{team.members.length}</td>
						<td>
							<Distance
								value={team.members.reduce(
									(acc, member) =>
										acc + member.activities.reduce((acc, activity) => acc + activity.distance, 0),
									0
								)}
							/>
						</td>
						<td>
							<button
								tabindex="0"
								onkeydown={async (e: KeyboardEvent) => {
									e.preventDefault()
									await joinTeam({ id: team.id })
								}}
								onclick={async () => await joinTeam({ id: team.id })}
							>
								{m.joinTeam()}
							</button>
							<button
								tabindex="0"
								onkeydown={async (e: KeyboardEvent) => {
									e.preventDefault()
									await leaveTeam({ id: team.id })
								}}
								onclick={async () => await leaveTeam({ id: team.id })}
							>
								{m.leaveTeam()}
							</button>
						</td>
					</tr>
				{/each}
			{/if}
		{:catch error}
			<tr>
				<td colspan="5">Error loading teams: {error.message}</td>
			</tr>
		{/await}
	</tbody>
</table>
