<script lang="ts">
	import type { PageProps } from './$types'
	import Distance from '$lib/components/Distance.svelte'
	import Duration from '$lib/components/Duration.svelte'
	import Card from '$lib/components/Card.svelte'
	import { m } from '$lib/paraglide/messages'
	import Button from '$lib/components/Button.svelte'

	let { data }: PageProps = $props()
	let selectedActivityIds = $state<number[]>([])
</script>

<Card>
	<form method="POST" action="?/sync">
		{#each selectedActivityIds as activityId (activityId)}
			<input type="hidden" name="activityIds" value={activityId} />
		{/each}

		<div class="w-full px-1.5 py-1">
			<!-- header row -->
			<div class="row header px-2">
				<div class="col-std">Select</div>
				<div class="col-std">Id</div>
				<div class="col-name">Name</div>
				<div class="col-std">{m.distance()}</div>
				<div class="col-std">Moving time</div>
				<div class="col-std">Type</div>
				<div class="col-std">Date</div>
			</div>

			{#await data.activities}
				<div class="row"><div class="col-full text-center italic">{m.loading()}</div></div>
			{:then activities}
				{#if activities.length === 0}
					<div class="row"><div class="col-full text-center italic">{m.noActivities()}</div></div>
				{:else}
					{#each activities as activity, index (index)}
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
										onchange={(e: any) => {
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
							<div class="truncate">{activity.name}</div>
							<div><Distance value={activity.distance} /></div>
							<div><Duration value={activity.moving_time} /></div>
							<div>{activity.sport_type}</div>
							<div>{new Date(activity.start_date).toLocaleDateString()}</div>
						</div>
					{/each}
				{/if}
			{:catch error}
				<div class="row">
					<div class="col-full text-red-600 text-center">
						Error loading activities: {error.message}
					</div>
				</div>
			{/await}
		</div>

		<Button label="Submit selected" variant="strava" type="submit" />
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
