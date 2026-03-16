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

			<div class="chipped-corners bg-black p-0.5">
				<div class="chipped-corners bg-brown-400 p-0.5">
					<div class="chipped-corners bg-black p-0.5">
						<div
							class="chipped-corners text-3d grid w-full grid-cols-3 place-content-center gap-2 border-brown-600 bg-sand-200 p-0.5 text-center font-pixel text-3xl font-bold tracking-wider text-brown-100 uppercase text-shadow-2xs text-shadow-black"
						>
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
		</div>
	</Card>
{/if}

<style>
	:global(.latest-activity) {
		grid-area: latest-activity;
	}
</style>
