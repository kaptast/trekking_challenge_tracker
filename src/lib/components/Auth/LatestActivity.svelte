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
		<div class="w-full pt-2 pb-1">
			<h2 class="text-black text-center text-2xl leading-none font-bold uppercase">
				{m.latestActivity()}
			</h2>

			<div class="chipped-corners mx-1 mt-2 bg-brown-900 p-0.5">
				<div class="chipped-corners bg-brown-300 p-0.5">
					<div class="chipped-corners bg-brown-900 p-0.5">
						<div
							class="chipped-corners grid w-full grid-cols-3 place-content-center gap-2 border-brown-600 bg-olive-300 p-0.5 text-center"
						>
							<div class="relative col-span-3 w-full">
								<SummaryMap
									class="h-auto w-full"
									summaryPolyline={activity.polyline ?? ''}
								/>
								<div class="absolute top-1 right-1 font-sans text-right text-xs leading-tight font-semibold normal-case">
									{#if activity.source === 'strava'}
										<a
											href="https://www.strava.com/activities/{activity.id}"
											target="_blank"
											rel="noopener noreferrer"
											style="color: #FC5200"
										>
											View on Strava
										</a>
										<br />
									{/if}
									{#if activity.deviceName}
										<span class="text-sand">{activity.deviceName}</span>
									{/if}
								</div>
							</div>
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
