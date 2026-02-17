<script lang="ts">
	import Distance from '$lib/components/Distance.svelte'
	import { m } from '$lib/paraglide/messages'
	import { joinTeam, leaveTeam } from '../data.remote'
	import type { PageProps } from './$types'

	let { data }: PageProps = $props()
</script>

<dap-ds-table>
	<dap-ds-table-row>
		<dap-ds-table-header>Name</dap-ds-table-header>
		<dap-ds-table-header>Points</dap-ds-table-header>
		<dap-ds-table-header>Members</dap-ds-table-header>
		<dap-ds-table-header>Distance</dap-ds-table-header>
		<dap-ds-table-header>Actions</dap-ds-table-header>
	</dap-ds-table-row>
	{#await data.teams}
		<dap-ds-table-row>
			<dap-ds-table-cell colspan="5">{m.loading()}</dap-ds-table-cell>
		</dap-ds-table-row>
	{:then teams}
		{#if teams.length === 0}
			<dap-ds-table-row>
				<dap-ds-table-cell colspan="5">{m.noTeams()}</dap-ds-table-cell>
			</dap-ds-table-row>
		{:else}
			{#each teams as team}
				<dap-ds-table-row>
					<dap-ds-table-cell>{team.name}</dap-ds-table-cell>
					<dap-ds-table-cell>
						{0}
					</dap-ds-table-cell>
					<dap-ds-table-cell>{team.members.length}</dap-ds-table-cell>
					<dap-ds-table-cell>
						<Distance
							value={team.members.reduce(
								(acc, member) =>
									acc + member.activities.reduce((acc, activity) => acc + activity.distance, 0),
								0
							)}
						/>
					</dap-ds-table-cell>
					<dap-ds-table-cell>
						<dap-ds-button
							variant="subtle-neutral"
							role="button"
							tabindex="0"
							onkeydown={async (e: KeyboardEvent) => {
								e.preventDefault()
								await joinTeam({ id: team.id })
							}}
							onclick={async () => await joinTeam({ id: team.id })}
						>
							{m.joinTeam()}
						</dap-ds-button>
						<dap-ds-button
							variant="subtle-neutral"
							danger
							role="button"
							tabindex="0"
							onkeydown={async (e: KeyboardEvent) => {
								e.preventDefault()
								await leaveTeam({ id: team.id })
							}}
							onclick={async () => await leaveTeam({ id: team.id })}
						>
							{m.leaveTeam()}
						</dap-ds-button>
					</dap-ds-table-cell>
				</dap-ds-table-row>
			{/each}
		{/if}
	{:catch error}
		<dap-ds-table-row>
			<dap-ds-table-cell colspan="5">Error loading teams: {error.message}</dap-ds-table-cell>
		</dap-ds-table-row>
	{/await}
</dap-ds-table>
