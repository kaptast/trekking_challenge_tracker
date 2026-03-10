<script lang="ts">
	import { m } from '$lib/paraglide/messages'
	import Card from '$lib/components/Card.svelte'
	import Table from '$lib/components/Table.svelte'
	import type { Activity } from '$lib/types'

	type Props = {
		activities: Array<Activity>
	}

	let { activities }: Props = $props()
</script>

<Card class="activities">
	<Table title={m.recentActivities()}>
		{#each activities as activity, index (index)}
			<div class="grid grid-cols-[auto_1fr_auto_auto] gap-x-4 font-semibold">
				<div>{index + 1}.</div>
				<div>{activity.name}</div>
				<div>{m.pointsValue({ count: 0 })}</div>
				<div>{m.distanceValue({ distance: activity.distance / 1000 })}</div>
			</div>
		{/each}
	</Table>
</Card>

<style>
	:global(.activities) {
		grid-area: activities;
	}
</style>
