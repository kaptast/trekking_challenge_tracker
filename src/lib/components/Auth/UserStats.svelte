<script lang="ts">
	import Card from '$lib/components/Card.svelte'
	import type { Stats } from '$lib/types'

	type Props = {
		stats: Stats | null
	}

	let { stats }: Props = $props()
</script>

<Card class="stats">
	{#if stats}
		<div class="space-y-2">
			<p>Total Activities: {stats.activityCount}</p>
			<p>Total Distance: {(stats.totalDistance / 1000).toFixed(2)} km</p>
			<p>Average Distance: {(stats.averageDistance / 1000).toFixed(2)} km</p>
			<p>Longest Distance: {(stats.longestDistance / 1000).toFixed(2)} km</p>
			<p>Total Time: {(stats.totalTime / 3600).toFixed(2)} hours</p>
			<p>Average Time: {(stats.averageTime / 3600).toFixed(2)} hours</p>
			<p>Longest Time: {(stats.longestTime / 3600).toFixed(2)} hours</p>
			<p>Longest Streak: {stats.longestStreak} days</p>
		</div>
	{:else}
		<p>No stats available.</p>
	{/if}
</Card>

<style>
	:global(.stats) {
		grid-area: stats;
	}
</style>
