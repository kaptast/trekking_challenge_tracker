<script lang="ts">
	import type { PageServerData } from './$types'
	import Distance from '$lib/components/Distance.svelte'
	import Duration from '$lib/components/Duration.svelte'

	let { data }: { data: PageServerData } = $props()
	let selectedActivityIds = $state<number[]>([])
</script>

<form method="POST" action="?/sync">
	<input type="hidden" name="activityIds" value={selectedActivityIds} />
	<dap-ds-table>
		<dap-ds-table-row>
			<dap-ds-table-header>Select</dap-ds-table-header>
			<dap-ds-table-header>Id</dap-ds-table-header>
			<dap-ds-table-header>Name</dap-ds-table-header>
			<dap-ds-table-header>Distance</dap-ds-table-header>
			<dap-ds-table-header>Moving Time</dap-ds-table-header>
			<dap-ds-table-header>Type</dap-ds-table-header>
			<dap-ds-table-header>Date</dap-ds-table-header>
		</dap-ds-table-row>
		{#await data.activities}
			<dap-ds-table-row>
				<dap-ds-table-cell colspan="6">Loading activities...</dap-ds-table-cell>
			</dap-ds-table-row>
		{:then activities}
			{#if activities.length === 0}
				<dap-ds-table-row>
					<dap-ds-table-cell colspan="6">No activities found.</dap-ds-table-cell>
				</dap-ds-table-row>
			{:else}
				{#each activities as activity}
					<dap-ds-table-row>
						<dap-ds-table-cell>
							{#if activity.synced}
								<span>✓</span>
							{:else}
								<dap-ds-checkbox
									checked={selectedActivityIds.includes(activity.id)}
									value={activity.id}
									ondds-change={(e: any) => {
										if (e.target.checked) {
											selectedActivityIds = [...selectedActivityIds, activity.id]
										} else {
											selectedActivityIds = selectedActivityIds.filter((id) => id !== activity.id)
										}
									}}
								></dap-ds-checkbox>
							{/if}
						</dap-ds-table-cell>
						<dap-ds-table-cell>{activity.id}</dap-ds-table-cell>
						<dap-ds-table-cell>{activity.name}</dap-ds-table-cell>
						<dap-ds-table-cell><Distance value={activity.distance} /></dap-ds-table-cell>
						<dap-ds-table-cell><Duration value={activity.moving_time} /></dap-ds-table-cell>
						<dap-ds-table-cell>{activity.type}</dap-ds-table-cell>
						<dap-ds-table-cell
							>{new Date(activity.start_date).toLocaleDateString()}</dap-ds-table-cell
						>
					</dap-ds-table-row>
				{/each}
			{/if}
		{:catch error}
			<dap-ds-table-row>
				<dap-ds-table-cell colspan="6">Error loading activities: {error.message}</dap-ds-table-cell>
			</dap-ds-table-row>
		{/await}
	</dap-ds-table>
	<button type="submit">Submit Selected</button>
</form>
