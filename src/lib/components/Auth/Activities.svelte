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
	<div class="size-full">
		<div class="row header px-2">
			<div class="col-std">{m.date()}</div>
			<div class="col-name">{m.name()}</div>
			<div class="col-std">{m.points()}</div>
			<div class="col-std">{m.distance()}</div>
		</div>

		{#each activities as activity, index (index)}
			<div class="row px-2">
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
	</div>
</Card>

<style>
	:global(.activities) {
		grid-area: activities;
	}

	.row {
		display: grid;
		grid-template-columns: 2fr 2fr 1fr 2fr;
		align-items: center;
		column-gap: 1rem;
		height: 5rem;

		border-bottom: 2px solid var(--color-brown-600);
		font-weight: 600;
		font-size: 0.875rem;
		color: var(--color-brown-900);
	}

	.row:last-child {
		border-bottom: none;
	}

	.row.header {
		font-weight: 900;
		font-size: 1rem;
		height: 2rem;
		letter-spacing: 0.05em;
		background-color: oklch(from var(--color-sand) calc(l - 0.05) c h);
	}

	.row:nth-child(odd):not(.header) {
		background-color: oklch(from var(--color-sand) calc(l - 0.05) c h);
	}

	.row > *:first-child {
		justify-self: start;
	}

	.row > *:last-child {
		text-align: right;
	}
</style>
