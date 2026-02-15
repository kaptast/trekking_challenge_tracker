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
		<dap-ds-table-header>Elapsed Time</dap-ds-table-header>
		<dap-ds-table-header>Total Elevation Gain</dap-ds-table-header>
		<dap-ds-table-header>Type</dap-ds-table-header>
		<dap-ds-table-header>Map</dap-ds-table-header>
	</dap-ds-table-row>
	{#await data.activities}
		<dap-ds-table-row>
			<dap-ds-table-cell colspan="7">Loading activities...</dap-ds-table-cell>
		</dap-ds-table-row>
	{:then activities}
		{#each activities as activity}
			<dap-ds-table-row>
				<dap-ds-table-cell>{activity.name}</dap-ds-table-cell>
				<dap-ds-table-cell><Distance value={activity.distance} /></dap-ds-table-cell>
				<dap-ds-table-cell><Duration value={activity.moving_time} /></dap-ds-table-cell>
				<dap-ds-table-cell><Duration value={activity.elapsed_time} /></dap-ds-table-cell>
				<dap-ds-table-cell><Distance value={activity.total_elevation_gain} /></dap-ds-table-cell>
				<dap-ds-table-cell>{activity.type}</dap-ds-table-cell>
				<dap-ds-table-cell>
					<SummaryMap summaryPolyline={activity.map.summary_polyline} />
				</dap-ds-table-cell>
			</dap-ds-table-row>
		{/each}
	{:catch error}
		<dap-ds-table-row>
			<dap-ds-table-cell colspan="7">Error loading activities: {error.message}</dap-ds-table-cell>
		</dap-ds-table-row>
	{/await}
</dap-ds-table>
