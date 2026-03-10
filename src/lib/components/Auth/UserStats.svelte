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
		<div class="grid grid-cols-2 gap-2">
			<span class="font-semibold uppercase">{m.stats_totalActivities()}</span>
			<span class="place-self-end font-medium">{stats.activityCount}</span>

			<span class="font-semibold uppercase">{m.stats_totalDistance()}</span>
			<span class="place-self-end font-medium"><Distance value={stats.totalDistance} /></span>

			<span class="font-semibold uppercase">{m.stats_averageDistance()}</span>
			<span class="place-self-end font-medium"><Distance value={stats.averageDistance} /></span>

			<span class="font-semibold uppercase">{m.stats_longestDistance()}</span>
			<span class="place-self-end font-medium"><Distance value={stats.longestDistance} /></span>

			<span class="font-semibold uppercase">{m.stats_totalTime()}</span>
			<span class="place-self-end font-medium"><Duration value={stats.totalTime} /></span>

			<span class="font-semibold uppercase">{m.stats_averageTime()}</span>
			<span class="place-self-end font-medium"><Duration value={stats.averageTime} /></span>

			<span class="font-semibold uppercase">{m.stats_longestTime()}</span>
			<span class="place-self-end font-medium"><Duration value={stats.longestTime} /></span>

			<span class="font-semibold uppercase">{m.stats_longestStreak()}</span>
			<span class="place-self-end font-medium">{m.streak({ value: stats.longestStreak })}</span>
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
