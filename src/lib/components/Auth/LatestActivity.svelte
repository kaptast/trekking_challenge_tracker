<script lang="ts">
	import { m } from '$lib/paraglide/messages'
	import Card from '$lib/components/Card.svelte'
	import type { Activity } from '$lib/types'
	import Distance from '$lib/components/Distance.svelte'
	import SummaryMap from '$lib/components/SummaryMap.svelte'

	type Props = {
		activity: Activity | null
	}

	let { activity }: Props = $props()
</script>

{#if activity}
	<Card class="latest-activity">
		<div class="w-full p-1 pt-4">
			<h2 class="text-center text-xl leading-none font-bold text-black uppercase">
				{m.latestActivity()}
			</h2>

			<div class="my-2 w-full border-b-2 border-brown-200"></div>

			<div class="chipped-corners w-full bg-black p-0.5">
				<div class="chipped-corners bg-olive-500 p-4">
					<div class="grid w-full grid-cols-3 gap-2 text-center font-bold">
						<SummaryMap
							class="col-span-3 h-auto w-full"
							summaryPolyline={activity.polyline ?? ''}
						/>
						<div>{activity.name}</div>
						<div>{m.pointsValue({ count: activity.points ?? 0 })}</div>
						<div><Distance value={activity.distance} /></div>
					</div>
				</div>
			</div>
		</div>
	</Card>
{/if}

<style>
	:global(.latest-activity) {
		grid-area: latest-activity;
	}
</style>
