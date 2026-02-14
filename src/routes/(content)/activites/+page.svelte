<script lang="ts">
	import type { PageServerData } from './$types'

	let { data }: { data: PageServerData } = $props()
</script>

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Distance</th>
			<th>Moving Time</th>
			<th>Elapsed Time</th>
			<th>Total Elevation Gain</th>
			<th>Type</th>
		</tr>
	</thead>
	<tbody>
		{#await data.activities}
			<tr>
				<td colspan="6">Loading activities...</td>
			</tr>
		{:then activities}
			{#each activities as activity}
				<tr>
					<td>{activity.name}</td>
					<td>{activity.distance}</td>
					<td>{activity.moving_time}</td>
					<td>{activity.elapsed_time}</td>
					<td>{activity.total_elevation_gain}</td>
					<td>{activity.type}</td>
				</tr>
			{/each}
		{:catch error}
			<tr>
				<td colspan="6">Error loading activities: {error.message}</td>
			</tr>
		{/await}
	</tbody>
</table>
