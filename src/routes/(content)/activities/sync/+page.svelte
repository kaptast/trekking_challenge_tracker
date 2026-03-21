<script lang="ts">
	import type { PageProps } from './$types'
	import Distance from '$lib/components/Distance.svelte'
	import Duration from '$lib/components/Duration.svelte'
	import Card from '$lib/components/Card.svelte'
	import { m } from '$lib/paraglide/messages'
	import Button from '$lib/components/Button.svelte'
	import { OverlayScrollbarsComponent } from 'overlayscrollbars-svelte'
	import ActivityIcon from '$lib/components/ActivityIcon.svelte'
	import type { SportType } from '$lib/types'

	let { data }: PageProps = $props()
	let selectedActivityIds = $state<number[]>([])

	const prevPage = $derived(data.page - 1)
	const nextPage = $derived(data.page + 1)
</script>

<form method="POST" action="?/sync">
	<div class="mb-4 flex w-full items-center justify-between">
		<div class="flex items-center gap-x-2">
			<Button
				href="?page={prevPage}"
				disabled={data.page <= 1}
				class="flex items-center gap-x-1 pl-1!"
			>
				<svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					shape-rendering="crispEdges"
					fill="currentColor"
					class="rotate-180"
				>
					<path d="M4 2 H6 V4 H8 V6 H10 V8 H8 V10 H6 V12 H4 V10 H6 V8 H8 V6 H6 V4 H4 Z" />
				</svg>

				{m.previousPage()}
			</Button>

			<div class="chipped-corners inline-block bg-brown-900 p-1">
				<span
					class="chipped-corners page-number block w-12 border-4 px-3 text-center font-pixel text-2xl"
				>
					{data.page}
				</span>
			</div>

			<Button
				href="?page={nextPage}"
				disabled={!data.hasMore}
				class="flex items-center gap-x-1 pr-1!"
			>
				{m.nextPage()}

				<svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					shape-rendering="crispEdges"
					fill="currentColor"
				>
					<path d="M4 2 H6 V4 H8 V6 H10 V8 H8 V10 H6 V12 H4 V10 H6 V8 H8 V6 H6 V4 H4 Z" />
				</svg>
			</Button>
		</div>

		<Button label={m.submitSelected()} variant="strava" type="submit" />
	</div>

	<Card>
		<input type="hidden" name="page" value={data.page} />
		{#each selectedActivityIds as activityId (activityId)}
			<input type="hidden" name="activityIds" value={activityId} />
		{/each}

		<div class="w-full">
			<div class="row header px-2">
				<div></div>
				<div>{m.id()}</div>
				<div>{m.name()}</div>
				<div>{m.distance()}</div>
				<div>{m.movingTime()}</div>
				<div>{m.type()}</div>
				<div>{m.date()}</div>
			</div>

			<OverlayScrollbarsComponent defer class="max-h-[calc(100dvh-13.375rem)]">
				{#if data.activities.length === 0}
					<div class="row"><div class="col-full text-center italic">{m.noActivities()}</div></div>
				{:else}
					{#each data.activities as activity, index (index)}
						<div class="row px-2 py-3.5">
							<div>
								{#if activity.synced}
									<span>✓</span>
								{:else}
									<input
										type="checkbox"
										name="activityIds"
										checked={selectedActivityIds.includes(activity.id)}
										value={activity.id}
										onchange={(e: unknown) => {
											if (e.target.checked) {
												selectedActivityIds = [...selectedActivityIds, activity.id]
											} else {
												selectedActivityIds = selectedActivityIds.filter((id) => id !== activity.id)
											}
										}}
									/>
								{/if}
							</div>
							<div>{activity.id}</div>
							<div class="min-w-0">
								<div class="truncate">{activity.name}</div>
								<a
									href="https://www.strava.com/activities/{activity.id}"
									target="_blank"
									rel="noopener noreferrer"
									class="text-xs font-semibold"
									style="color: #FC5200">View on Strava</a
								>
								{#if activity.device_name}
									<div class="text-xs font-normal text-brown-600">{activity.device_name}</div>
								{/if}
							</div>
							<div><Distance value={activity.distance} /></div>
							<div><Duration value={activity.moving_time} /></div>
							<div><ActivityIcon type={activity.sport_type as SportType} /></div>
							<div>{new Date(activity.start_date).toLocaleDateString()}</div>
						</div>
					{/each}
				{/if}
			</OverlayScrollbarsComponent>
		</div>
	</Card>
</form>

<style>
	.page-number {
		background-color: var(--color-orange-500);
		border-top-color: oklch(from var(--color-orange-500) calc(l + 0.1) c h);
		border-right-color: oklch(from var(--color-orange-500) calc(l - 0.05) c h);
		border-bottom-color: oklch(from var(--color-orange-500) calc(l - 0.1) c h);
		border-left-color: oklch(from var(--color-orange-500) calc(l + 0.1) c h);
	}

	.row {
		display: grid;
		grid-template-columns: 0.75rem 2fr 3.5fr 1fr 2.5fr 1fr 2.5fr;
		align-items: center;
		justify-items: center;

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
		letter-spacing: 0.05em;
		background-color: oklch(from var(--color-sand) calc(l - 0.05) c h);
	}

	.row:nth-child(even):not(.header) {
		background-color: oklch(from var(--color-sand) calc(l - 0.05) c h);
	}

	.row > *:first-child {
		justify-self: start;
	}

	.row > *:last-child {
		text-align: right;
	}
</style>
