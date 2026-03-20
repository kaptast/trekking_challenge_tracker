<script lang="ts">
	import Button from '$lib/components/Button.svelte'
	import Card from '$lib/components/Card.svelte'
	import Distance from '$lib/components/Distance.svelte'
	import Hero from '$lib/components/Hero.svelte'
	import Table from '$lib/components/Table.svelte'

	import { m } from '$lib/paraglide/messages'
	import { localizeHref } from '$lib/paraglide/runtime'

	import type { PageProps } from './$types'

	let { data }: PageProps = $props()

	const challengeInfo = $derived(data.challengeInfo)
</script>

<Hero title={challengeInfo?.isActive ? challengeInfo.challenge.name : m.challengeTitle()}>
	<Button
		label={m.joinTheAdventure()}
		href={localizeHref('/auth')}
		size="large"
		class="font-mono"
	/>
</Hero>

<!-- Challenge info banner -->
<div class="mt-4">
	{#if challengeInfo?.isActive}
		{@const c = challengeInfo.challenge}
		<Card class="w-full">
			<div class="p-4">
				<div class="flex flex-wrap items-center justify-between gap-4">
					<div>
						<h2 class="text-xl font-bold text-brown-800 uppercase">{c.name}</h2>
						<p class="text-brown-500 text-sm font-semibold">
							{m.challengeDateRange({ startDate: c.startDate, endDate: c.endDate })}
						</p>
					</div>
					<div class="text-brown-500 text-right text-sm font-semibold">
						<div>{m.challengeProgress({ percent: challengeInfo.progressPercent })}</div>
						<div>{m.challengeDaysLeft({ days: challengeInfo.daysLeft })}</div>
					</div>
				</div>
				<div class="bg-gray-200 mt-3 h-3 w-full overflow-hidden rounded-full">
					<div
						class="h-full rounded-full bg-black transition-all"
						style="width: {challengeInfo.progressPercent}%"
					></div>
				</div>
			</div>
		</Card>
	{:else if challengeInfo && !challengeInfo.isActive}
		<Card class="w-full">
			<div class="p-4 text-center">
				<h2 class="text-lg font-bold text-brown-800 uppercase">{m.nextChallenge()}</h2>
				<p class="text-brown-500 text-sm font-semibold">
					{challengeInfo.challenge.name} &mdash; {m.nextChallengeStarts({
						date: challengeInfo.challenge.startDate
					})}
				</p>
			</div>
		</Card>
	{:else}
		<Card class="w-full">
			<div class="p-4 text-center">
				<p class="text-brown-500 text-sm font-semibold">{m.noChallengeActive()}</p>
			</div>
		</Card>
	{/if}
</div>

<div class="grid grid-cols-12 gap-4 pt-4">
	<Card class="col-span-4">
		<div class="grid place-items-center p-4 text-center">
			<div class="flex gap-2">
				<img src="/gpx.png" alt={m.imgAltGpx()} class="size-20 min-h-20 min-w-20" />

				<div class="chipped-corners bg-black p-0.5">
					<img
						src="/strava.png"
						alt={m.imgAltStrava()}
						class="chipped-corners size-19 min-h-19 min-w-19"
					/>
				</div>
			</div>

			<h3 class="mt-4 font-sans text-2xl font-bold text-brown-800 uppercase">{m.uploadAndSync()}</h3>
			<h4 class="text-base font-semibold text-brown-500">{m.uploadAGpxFileOrSnycFromStrava()}</h4>
		</div>
	</Card>

	<Card class="col-span-4">
		<div class="grid place-items-center p-4 text-center">
			<img src="/team.png" alt={m.imgAltTeam()} class="w-50 min-w-50" />

			<h3 class="mt-4 text-2xl font-bold text-brown-800 uppercase">{m.createYourOwnTeam()}</h3>
			<h4 class="text-base font-semibold text-brown-500">{m.createOrJoinTeam()}</h4>
		</div>
	</Card>

	<Card class="col-span-4">
		<div class="grid place-items-center p-4 text-center">
			<img src="/xp.png" alt={m.imgAltXp()} class="size-20 min-h-20 min-w-20" />

			<h3 class="mt-4 text-2xl font-bold text-brown-800 uppercase">{m.earnPoints()}</h3>
			<h4 class="text-base font-semibold text-brown-500">{m.earnPointsForTheLeaderboard()}</h4>
		</div>
	</Card>

	<Card class="col-span-9">
		<Table title={m.topTeams()}>
			{#await data.teams then teams}
				{#each teams as team, index (index)}
					<div class="grid grid-cols-[auto_1fr_auto_auto] gap-x-4 font-semibold">
						<div>{index + 1}.</div>
						<div>{team.name}</div>
						<div>{m.pointsValue({ count: team.points })}</div>
						<div><Distance value={team.totalDistance} /></div>
					</div>
				{/each}
			{/await}
		</Table>

		<div class="flex justify-end px-4 pb-2">
			<Button href={localizeHref('/teams')} label={m.viewLeaderboard()} />
		</div>
	</Card>

	<Card class="col-span-3">
		<div class="grid place-items-center p-4 text-center">
			<img src="/xp.png" alt={m.imgAltXp()} class="size-20 min-h-20 min-w-20" />

			{#await data.stats then stats}
				{@const distance = (stats.distance ?? 0) / 1000}
				{@const averageDistance = (stats.averageDistance ?? 0) / 1000}
				<h3 class="mt-4 text-xl font-bold text-brown-800 uppercase">{m.statistics()}</h3>

					<h4 class="text-lg font-semibold text-brown-500">
						{m.totalDistance({ distance: distance.toFixed(2) })}
					</h4>
					<h4 class="text-lg font-semibold text-brown-500">
						{m.totalActivities({ count: stats.activityCount })}
					</h4>
					<h4 class="text-lg font-semibold text-brown-500">
						{m.averageDistance({ distance: averageDistance.toFixed(2) })}
					</h4>
					<h4 class="text-lg font-semibold text-brown-500">
						{m.averageActivities({ count: stats.averageActivityCountPerUser })}
					</h4>
			{/await}
		</div>
	</Card>
</div>
