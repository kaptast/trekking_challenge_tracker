<script lang="ts">
	import { m } from '$lib/paraglide/messages'
	import Card from '$lib/components/Card.svelte'
	import type { Activity } from '$lib/types'
	import Distance from '$lib/components/Distance.svelte'

	type Props = {
		activity: Activity | null
	}

	let { activity }: Props = $props()
</script>

{#if activity}
	<Card class="latest-activity">
		<div class="grid grid-cols-[auto_1fr_auto_auto] gap-x-4 font-semibold">
			<div>{activity.name}</div>
			<div>{m.pointsValue({ count: 0 })}</div>
			<div><Distance value={activity.distance} /></div>
		</div>
	</Card>
{/if}

<style>
	:global(.latest-activity) {
		grid-area: latest-activity;
	}
</style>
