<script lang="ts">
	import Card from '$lib/components/Card.svelte'
	import { m } from '$lib/paraglide/messages'
	import type { Stats } from '$lib/types'
	import Distance from '$lib/components/Distance.svelte'
	import Duration from '$lib/components/Duration.svelte'

	type Props = {
		stats: Stats | null
	}

	let { stats }: Props = $props()
</script>

<Card class="stats">
	{#if stats}
		<div class="grid w-full grid-cols-2 gap-2">
			<span class="pl-4 font-semibold uppercase">{m.stats_totalActivities()}</span>
			<span class="place-self-end pr-4 font-medium">{stats.activityCount}</span>

			<div class="col-span-2 border-t-2 border-brown-600"></div>

			<span class="b pl-4 font-semibold uppercase">{m.stats_totalDistance()}</span>
			<span class="place-self-end pr-4 font-medium"><Distance value={stats.totalDistance} /></span>

			<div class="col-span-2 border-t-2 border-brown-600"></div>

			<span class="pl-4 font-semibold uppercase">{m.stats_averageDistance()}</span>
			<span class="place-self-end pr-4 font-medium"><Distance value={stats.averageDistance} /></span
			>

			<div class="col-span-2 border-t-2 border-brown-600"></div>

			<span class="pl-4 font-semibold uppercase">{m.stats_longestDistance()}</span>
			<span class="place-self-end pr-4 font-medium"><Distance value={stats.longestDistance} /></span
			>

			<div class="col-span-2 border-t-2 border-brown-600"></div>

			<span class="pl-4 font-semibold uppercase">{m.stats_totalTime()}</span>
			<span class="place-self-end pr-4 font-medium"><Duration value={stats.totalTime} /></span>

			<div class="col-span-2 border-t-2 border-brown-600"></div>

			<span class="pl-4 font-semibold uppercase">{m.stats_averageTime()}</span>
			<span class="place-self-end pr-4 font-medium"><Duration value={stats.averageTime} /></span>

			<div class="col-span-2 border-t-2 border-brown-600"></div>

			<span class="pl-4 font-semibold uppercase">{m.stats_longestTime()}</span>
			<span class="place-self-end pr-4 font-medium"><Duration value={stats.longestTime} /></span>

			<div class="col-span-2 border-t-2 border-brown-600"></div>

			<span class="pl-4 font-semibold uppercase">{m.stats_longestStreak()}</span>
			<span class="place-self-end pr-4 font-medium">{m.streak({ value: stats.longestStreak })}</span
			>
		</div>
	{:else}
		<p>{m.noData()}</p>
	{/if}
</Card>

<style>
	:global(.stats) {
		grid-area: stats;
	}
</style>
