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
			<div class="col-name">{m.name()}</div>
			<div class="col-std">{m.distance()}</div>
			<div class="col-std">{m.movingTime()}</div>
			<div class="col-std">{m.type()}</div>
			<div class="col-std">{m.points()}</div>
			<div class="col-std">{m.date()}</div>
			<div class="col-std">{m.map()}</div>
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
						<div><ActivityIcon type={activity.sportType as SportType} /></div>
						<div>{activity.points}</div>
						<div>
							{activity.startDate ? new Date(activity.startDate).toLocaleDateString() : '—'}
						</div>
						<div class="chipped-corners bg-black p-0.5">
							<div class="chipped-corners bg-brown-400 p-0.5">
								<div class="chipped-corners bg-black p-0.5">
									<div class="chipped-corners grid place-content-center bg-sand-200 p-0.5">
										<SummaryMap summaryPolyline={activity.polyline ?? ''} />
									</div>
								</div>
							</div>
						</div>
						{#if data.user}
							<div class="place-self-center pl-4">
								<button
									type="button"
									class="chipped-corners cursor-pointer bg-black p-0.5"
									aria-label={m.deleteActivity()}
									onclick={() => handleDelete(activity.id)}
								>
									<div
										class="chipped-corners grid size-6 place-content-center border-2 border-t-red-100 border-r-red-500 border-b-red-500 border-l-red-100 bg-red-300 text-sand-100"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											xmlns:xlink="http://www.w3.org/1999/xlink"
											class="size-3"
											viewBox="0 0 20 20"
											><g fill="none"
												><path
													d="M3.897 4.054l.073-.084a.75.75 0 0 1 .976-.073l.084.073L10 8.939l4.97-4.97a.75.75 0 0 1 .976-.072l.084.073a.75.75 0 0 1 .073.976l-.073.084L11.061 10l4.97 4.97a.75.75 0 0 1 .072.976l-.073.084a.75.75 0 0 1-.976.073l-.084-.073L10 11.061l-4.97 4.97a.75.75 0 0 1-.976.072l-.084-.073a.75.75 0 0 1-.073-.976l.073-.084L8.939 10l-4.97-4.97a.75.75 0 0 1-.072-.976l.073-.084l-.073.084z"
													fill="currentColor"
												></path></g
											></svg
										>
									</div>
								</button>
							</div>
						{/if}
					</div>
				{/each}
			{/if}
		{:catch error}
			<div class="row">
				<div class="col-span-5 py-5 text-center! text-brown-500">
					{m.errorLoadingActivities({ message: error.message })}
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
