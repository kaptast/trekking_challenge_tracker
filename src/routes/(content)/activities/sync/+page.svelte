<script lang="ts">
	import type { PageProps } from './$types'
	import Distance from '$lib/components/Distance.svelte'
	import Duration from '$lib/components/Duration.svelte'
	import Card from '$lib/components/Card.svelte'
	import { m } from '$lib/paraglide/messages'
	import Button from '$lib/components/Button.svelte'
	import { OverlayScrollbarsComponent } from 'overlayscrollbars-svelte'

	let { data }: PageProps = $props()
	let selectedActivityIds = $state<number[]>([])

	const prevPage = $derived(data.page - 1)
	const nextPage = $derived(data.page + 1)
</script>

<Card>
	<form method="POST" action="?/sync">
		<input type="hidden" name="page" value={data.page} />
		{#each selectedActivityIds as activityId (activityId)}
			<input type="hidden" name="activityIds" value={activityId} />
		{/each}

		<div class="w-full px-1.5 py-1">
			<!-- header row -->
			<div class="row header px-2">
				<div class="col-std">{m.select()}</div>
				<div class="col-std">{m.id()}</div>
				<div class="col-name">{m.name()}</div>
				<div class="col-std">{m.distance()}</div>
				<div class="col-std">{m.movingTime()}</div>
				<div class="col-std">{m.type()}</div>
				<div class="col-std">{m.date()}</div>
			</div>

			<OverlayScrollbarsComponent defer class="max-h-[calc(100dvh-14rem)]">
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
							<div>{activity.sport_type}</div>
							<div>{new Date(activity.start_date).toLocaleDateString()}</div>
						</div>
					{/each}
				{/if}
			</OverlayScrollbarsComponent>
		</div>

		<div class="pagination">
			{#if data.page > 1}
				<a href="?page={prevPage}" class="page-btn">{m.previousPage()}</a>
			{:else}
				<span class="page-btn disabled">{m.previousPage()}</span>
			{/if}
			<span class="page-number">{data.page}</span>
			{#if data.hasMore}
				<a href="?page={nextPage}" class="page-btn">{m.nextPage()}</a>
			{:else}
				<span class="page-btn disabled">{m.nextPage()}</span>
			{/if}
		</div>

		<Button label={m.submitSelected()} variant="strava" type="submit" />
	</form>
</Card>

<style>
	.row {
		display: grid;
		grid-template-columns: repeat(7, minmax(0, 1fr));
		align-items: center;

		border-bottom: 1px solid var(--color-brown-200);
		font-weight: 700;
		color: var(--color-brown-800);
	}

	.row:last-child {
		border-bottom: none;
	}

	.row.header {
		font-weight: 600;
		font-size: 0.8rem;
		letter-spacing: 0.05em;
	}
</style>
