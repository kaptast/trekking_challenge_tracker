<script lang="ts">
	import { m } from '$lib/paraglide/messages'
	import type { PageProps } from './$types'

	let { data }: PageProps = $props()
</script>

{#await data.teams}
	<p>Loading teams...</p>
{:then teams}
	{#if teams.length === 0}
		<p>{m.noTeams()}</p>
	{:else}
		<ul>
			{#each teams as team}
				<li>{team.name}</li>
			{/each}
		</ul>
	{/if}
{:catch error}
	<p>Error loading teams: {error.message}</p>
{/await}
