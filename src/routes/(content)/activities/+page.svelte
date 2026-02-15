<script lang="ts">
	import type { PageServerData } from './$types'
	import SummaryMap from '$lib/components/SummaryMap.svelte'
	import Distance from '$lib/components/Distance.svelte'
	import Duration from '$lib/components/Duration.svelte'

	let { data }: { data: PageServerData } = $props()
</script>

<dap-ds-table>
	<dap-ds-table-row>
		<dap-ds-table-header>Name</dap-ds-table-header>
		<dap-ds-table-header>Distance</dap-ds-table-header>
		<dap-ds-table-header>Moving Time</dap-ds-table-header>
		<dap-ds-table-header>Type</dap-ds-table-header>
		<dap-ds-table-header>Map</dap-ds-table-header>
	</dap-ds-table-row>
	{#await data.activities}
		<dap-ds-table-row>
			<dap-ds-table-cell colspan="7">Loading activities...</dap-ds-table-cell>
		</dap-ds-table-row>
	{:then activities}
		{#if activities.length === 0}
			<dap-ds-table-row>
				<dap-ds-table-cell colspan="7">No activities found.</dap-ds-table-cell>
			</dap-ds-table-row>
		{:else}
			{#each activities as activity}
				<dap-ds-table-row>
					<dap-ds-table-cell>{activity.name}</dap-ds-table-cell>
					<dap-ds-table-cell><Distance value={activity.distance} /></dap-ds-table-cell>
					<dap-ds-table-cell><Duration value={activity.movingTime} /></dap-ds-table-cell>
					<dap-ds-table-cell>{activity.type}</dap-ds-table-cell>
					<dap-ds-table-cell>
						<SummaryMap summaryPolyline={activity.polyline} />
					</dap-ds-table-cell>
				</dap-ds-table-row>
			{/each}
		{/if}
	{:catch error}
		<dap-ds-table-row>
			<dap-ds-table-cell colspan="7">Error loading activities: {error.message}</dap-ds-table-cell>
		</dap-ds-table-row>
	{/await}
</dap-ds-table>
