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
	import { deleteActivity } from './activities.remote'
	import { invalidate } from '$app/navigation'
	import ActivityIcon from '$lib/components/ActivityIcon.svelte'
	import type { SportType } from '$lib/types'

	let { data }: PageProps = $props()

	async function handleDelete(id: string) {
		if (!confirm(m.deleteActivityConfirm())) return
		await deleteActivity({ id })
		invalidate('activities')
	}
</script>

{#if data.user}
	<Card class="mb-4">
		<div class="grid size-full grid-cols-1 gap-4 p-4 md:grid-cols-2">
			<GpxUpload />

			<div class="place-self-center">
				<Button
					variant="strava"
					size="large"
					href={localizeHref('/activities/sync')}
					label={m.importFromStrava()}
				/>
			</div>
		</div>
	</Card>
{/if}

<Card>
	<div class="size-full">
		<!-- header row -->
		<div class="row header px-2">
			<div class="col-name">{m.name()}</div>
			<div class="col-std">{m.distance()}</div>
			<div class="col-std">{m.movingTime()}</div>
			<div class="col-std">{m.type()}</div>
			<div class="col-std">{m.points()}</div>
			<div class="col-std">{m.date()}</div>
			<div class="col-std max-md:hidden">{m.map()}</div>
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
						<div class="min-w-0">
							<div class="truncate">{activity.name}</div>

							{#if activity.source === 'strava'}
								<a
									href="https://www.strava.com/activities/{activity.id}"
									target="_blank"
									rel="noopener noreferrer"
									class="text-xs font-semibold"
									style="color: #FC5200">View on Strava</a
								>
							{/if}

							{#if activity.deviceName}
								<div class="text-xs font-normal text-brown-600">{activity.deviceName}</div>
							{/if}
						</div>

						<div><Distance value={activity.distance} /></div>

						<div><Duration value={activity.movingTime ?? 0} /></div>

						<div><ActivityIcon type={activity.sportType as SportType} /></div>

						<div>{activity.points}</div>

						<div>
							{activity.startDate ? new Date(activity.startDate).toLocaleDateString() : '—'}
						</div>

						<Card class="size-full max-md:hidden">
							<div class="grid size-full place-items-center bg-olive-300 p-1">
								<SummaryMap summaryPolyline={activity.polyline ?? ''} />
							</div>
						</Card>

						{#if data.user}
							<div class="place-self-center pl-4">
								<Button
									type="button"
									variant="delete"
									class="px-0!"
									aria-label={m.deleteActivity()}
									onclick={() => handleDelete(activity.id)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										xmlns:xlink="http://www.w3.org/1999/xlink"
										class="size-3"
										viewBox="0 0 20 20"
									>
										<path
											d="M3.897 4.054l.073-.084a.75.75 0 0 1 .976-.073l.084.073L10 8.939l4.97-4.97a.75.75 0 0 1 .976-.072l.084.073a.75.75 0 0 1 .073.976l-.073.084L11.061 10l4.97 4.97a.75.75 0 0 1 .072.976l-.073.084a.75.75 0 0 1-.976.073l-.084-.073L10 11.061l-4.97 4.97a.75.75 0 0 1-.976.072l-.084-.073a.75.75 0 0 1-.073-.976l.073-.084L8.939 10l-4.97-4.97a.75.75 0 0 1-.072-.976l.073-.084l-.073.084z"
											fill="currentColor"
										></path>
									</svg>
								</Button>
							</div>
						{/if}
					</div>
				{/each}
			{/if}
		{:catch error}
			<div class="row">
				<div class="col-span-5 py-5 text-center! text-brown-600">
					{m.errorLoadingActivities({ message: error.message })}
				</div>
			</div>
		{/await}
	</div>
</Card>

<style>
	.row {
		display: grid;
		grid-template-columns: 3fr 2fr 3fr 4rem 4rem 2fr 2fr 2rem;
		align-items: center;
		justify-items: center;

		border-bottom: 2px solid var(--color-brown-600);
		font-weight: 600;
		font-size: 0.875rem;
		color: var(--color-brown-900);
	}

	@media screen and (max-width: 768px) {
		.row {
			grid-template-columns: repeat(7, 1fr);
		}
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
