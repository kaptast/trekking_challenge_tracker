<script lang="ts">
	import { m } from '$lib/paraglide/messages'
	import Card from '$lib/components/Card.svelte'
	import type { Activity } from '$lib/types'
	import Distance from '$lib/components/Distance.svelte'

	type Props = {
		activities: Array<Activity>
	}

	let { activities }: Props = $props()
</script>

<Card class="activities">
	{#each activities as activity, index (index)}
		<div class="grid grid-cols-[auto_1fr_auto_auto] gap-x-4 font-semibold">
			<div>{new Date(activity.startDate ?? 0).toLocaleDateString()}</div>
			<div class="min-w-0">
				<div class="truncate">{activity.name}</div>
				{#if activity.source === 'strava'}
					<a
						href="https://www.strava.com/activities/{activity.id}"
						target="_blank"
						rel="noopener noreferrer"
						class="text-xs font-semibold"
						style="color: #FC5200"
					>
						View on Strava
					</a>
				{/if}

				{#if activity.deviceName}
					<div class="text-xs font-normal opacity-70">{activity.deviceName}</div>
				{/if}
			</div>
			<div>{m.pointsValue({ count: activity.points ?? 0 })}</div>
			<div><Distance value={activity.distance} /></div>
		</div>
	{/each}
</Card>

<style>
	:global(.activities) {
		grid-area: activities;
	}
</style>
