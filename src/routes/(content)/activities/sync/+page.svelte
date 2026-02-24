<script lang="ts">
	import type { PageProps } from './$types'
	import Distance from '$lib/components/Distance.svelte'
	import Duration from '$lib/components/Duration.svelte'

	let { data }: PageProps = $props()
	let selectedActivityIds = $state<number[]>([])
</script>

<form method="POST" action="?/sync">
	{#each selectedActivityIds as activityId}
		<input type="hidden" name="activityIds" value={activityId} />
	{/each}
	<table>
		<thead>
			<tr>
				<th>Select</th>
				<th>Id</th>
				<th>Name</th>
				<th>Distance</th>
				<th>Moving Time</th>
				<th>Type</th>
				<th>Date</th>
			</tr>
		</thead>
		<tbody>
			{#await data.activities}
				<tr>
					<td colspan="6">Loading activities...</td>
				</tr>
			{:then activities}
				{#if activities.length === 0}
					<tr>
						<td colspan="6">No activities found.</td>
					</tr>
				{:else}
					{#each activities as activity}
						<tr>
							<td>
								{#if activity.synced}
									<span>✓</span>
								{:else}
									<input
										type="checkbox"
										name="activityIds"
										checked={selectedActivityIds.includes(activity.id)}
										value={activity.id}
										onchange={(e: any) => {
											if (e.target.checked) {
												selectedActivityIds = [...selectedActivityIds, activity.id]
											} else {
												selectedActivityIds = selectedActivityIds.filter((id) => id !== activity.id)
											}
										}}
									/>
								{/if}
							</td>
							<td>{activity.id}</td>
							<td>{activity.name}</td>
							<td><Distance value={activity.distance} /></td>
							<td><Duration value={activity.moving_time} /></td>
							<td>{activity.type}</td>
							<td>{new Date(activity.start_date).toLocaleDateString()}</td>
						</tr>
					{/each}
				{/if}
			{:catch error}
				<tr>
					<td colspan="6">Error loading activities: {error.message}</td>
				</tr>
			{/await}
		</tbody>
	</table>
	<button type="submit">Submit Selected</button>
</form>
