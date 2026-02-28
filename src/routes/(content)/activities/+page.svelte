<script lang="ts">
	import type { PageProps } from './$types'
	import SummaryMap from '$lib/components/SummaryMap.svelte'
	import Distance from '$lib/components/Distance.svelte'
	import Duration from '$lib/components/Duration.svelte'
	import Button from '$lib/components/Button.svelte'
	import GpxUpload from '$lib/components/GpxUpload.svelte'

	let { data }: PageProps = $props()
</script>

<div class="mb-6">
	<GpxUpload />
</div>

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Distance</th>
			<th>Moving Time</th>
			<th>Type</th>
			<th>Map</th>
		</tr>
	</thead>
	<tbody>
		{#await data.activities}
			<tr>
				<td colspan="7">Loading activities...</td>
			</tr>
		{:then activities}
			{#if activities.length === 0}
				<tr>
					<td colspan="7">No activities found.</td>
				</tr>
			{:else}
				{#each activities as activity}
					<tr>
						<td>{activity.name}</td>
						<td><Distance value={activity.distance} /></td>
						<td><Duration value={activity.movingTime ?? 0} /></td>
						<td>{activity.type}</td>
						<td>
							<SummaryMap summaryPolyline={activity.polyline ?? ''} />
						</td>
					</tr>
				{/each}
			{/if}
		{:catch error}
			<tr>
				<td colspan="7">Error loading activities: {error.message}</td>
			</tr>
		{/await}
	</tbody>
</table>
