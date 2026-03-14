<script lang="ts">
	import type { PageProps } from './$types'
	import SummaryMap from '$lib/components/SummaryMap.svelte'
	import Distance from '$lib/components/Distance.svelte'
	import Duration from '$lib/components/Duration.svelte'
	import Button from '$lib/components/Button.svelte'
	import GpxUpload from '$lib/components/GpxUpload.svelte'
	import Card from '$lib/components/Card.svelte'
	import { localizeHref } from '$lib/paraglide/runtime'
	import { m } from '$lib/paraglide/messages'
	import { deleteActivity } from './activities.remote.js'
	import { invalidate } from '$app/navigation'

	let { data }: PageProps = $props()

	async function handleDelete(id: string) {
		if (!confirm('Delete this activity?')) return
		await deleteActivity({ id })
		invalidate('activities')
	}
</script>

{#if data.user}
	<div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
		<GpxUpload />

		<Card>
			<div class="p-4">
				<Button
					variant="strava"
					size="large"
					href={localizeHref('/activities/sync')}
					label={m.importFromStrava()}
				/>
			</div>
		</Card>
	</div>
{/if}

<Card>
	<div class="w-full px-1.5 py-1">
		<!-- header row -->
		<div class="row header px-2">
			<div class="col-name">Name</div>
			<div class="col-std">{m.distance()}</div>
			<div class="col-std">Moving time</div>
			<div class="col-std">Type</div>
			<div class="col-std">Points</div>
			<div class="col-std">Date</div>
			<div class="col-std">Map</div>
			{#if data.user}<div class="col-std"></div>{/if}
		</div>

		{#await data.activities}
			<div class="row"><div class="col-full text-center italic">{m.loading()}</div></div>
		{:then activities}
			{#if activities.length === 0}
				<div class="row"><div class="col-full text-center italic">{m.noActivities()}</div></div>
			{:else}
				{#each activities as activity, index (index)}
					<div class="row px-2 py-3.5">
						<div class="truncate">{activity.name}</div>
						<div><Distance value={activity.distance} /></div>
						<div><Duration value={activity.movingTime ?? 0} /></div>
						<div>{activity.sportType}</div>
						<div>{activity.points}</div>
						<div>
							{activity.startDate ? new Date(activity.startDate).toLocaleDateString() : '—'}
						</div>
						<div class="place-self-end">
							<SummaryMap summaryPolyline={activity.polyline ?? ''} />
						</div>
						{#if data.user}
							<div class="place-self-center">
								<button
									type="button"
									class="text-red-600 hover:text-red-800 cursor-pointer"
									aria-label="Delete activity"
									onclick={() => handleDelete(activity.id)}>✕</button
								>
							</div>
						{/if}
					</div>
				{/each}
			{/if}
		{:catch error}
			<div class="row">
				<div class="col-span-5 py-5 text-center! text-brown-500">
					Error loading activities: {error.message}
				</div>
			</div>
		{/await}
	</div>
</Card>

<style>
	.row {
		display: grid;
		grid-template-columns: repeat(7, minmax(0, 1fr)) 2rem;
		align-items: center;

		border-bottom: 2px solid var(--color-brown-300);
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

	.row > *:last-child {
		text-align: right;
	}
</style>
