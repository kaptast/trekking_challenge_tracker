<script lang="ts">
	import Button from '$lib/components/Button.svelte'
	import Card from '$lib/components/Card.svelte'
	import Table from '$lib/components/Table.svelte'

	import { m } from '$lib/paraglide/messages'
	import { localizeHref } from '$lib/paraglide/runtime'

	import type { PageProps } from './$types'

	let { data }: PageProps = $props()
</script>

<div class="flex flex-col items-center justify-center gap-y-7 py-16">
	<h1
		class="text-3d text-3d-thicker font-pixel text-7xl text-brown-100 uppercase text-shadow-black"
	>
		Túrakihívás 2026
	</h1>

	<Button label="Lépj be a kalandba!" href={localizeHref('/auth')} size="large" class="font-mono" />
</div>

<div class="grid grid-cols-12 grid-rows-2 gap-4 pt-4">
	<Card class="col-span-4">
		<div class="grid place-items-center p-4 text-center">
			<div class="flex gap-2">
				<img src="/gpx.png" alt="GPX file format" class="size-20 min-h-20 min-w-20" />
				<img src="/strava.png" alt="Strava Sync" class="size-20 min-h-20 min-w-20" />
			</div>

			<h3 class="mt-4 font-sans text-2xl font-bold text-black uppercase">{m.uploadAndSync()}</h3>
			<h4 class="text-base font-semibold text-black">{m.uploadAGpxFileOrSnycFromStrava()}</h4>
		</div>
	</Card>

	<Card class="col-span-4">
		<div class="grid place-items-center p-4 text-center">
			<img src="/team.png" alt="Team" class="w-50 min-w-50" />

			<h3 class="mt-4 text-2xl font-bold text-black uppercase">{m.createYourOwnTeam()}</h3>
			<h4 class="text-base font-semibold text-black">{m.createOrJoinTeam()}</h4>
		</div>
	</Card>

	<Card class="col-span-4">
		<div class="grid place-items-center p-4 text-center">
			<img src="/xp.png" alt="XP" class="size-20 min-h-20 min-w-20" />

			<h3 class="mt-4 text-2xl font-bold text-black uppercase">{m.earnPoints()}</h3>
			<h4 class="text-base font-semibold text-black">{m.earnPointsForTheLeaderboard()}</h4>
		</div>
	</Card>

	<Card class="col-span-9">
		<Table title="Top csapatok">
			{#await data.teams then teams}
				{#each teams as team, index (index)}
					<div class="grid grid-cols-[auto_1fr_auto_auto] gap-x-4 font-semibold">
						<div>{index + 1}.</div>
						<div>{team.name}</div>
						<div>{m.pointsValue({ count: 0 })}</div>
						<div>{m.distanceValue({ distance: 0 })}</div>
					</div>
				{/each}
			{/await}
		</Table>

		<a href={localizeHref('/leaderboard')} class="ml-auto px-4 font-semibold uppercase">
			{m.viewLeaderboard()}
		</a>
	</Card>

	<Card class="col-span-3">
		<div class="grid place-items-center p-4 text-center">
			<img src="/xp.png" alt="XP" class="size-20 min-h-20 min-w-20" />

			{#await data.stats then stats}
				{@const distance = (stats.distance ?? 0) / 1000}
				<h3 class="mt-4 text-xl font-bold text-black uppercase">
					{m.sumOfDistances({ distance: distance.toFixed(2) })}
				</h3>
				<h4 class="text-lg font-semibold text-black">
					{m.totalActivities({ count: stats.activityCount })}
				</h4>
			{/await}
		</div>
	</Card>
</div>
