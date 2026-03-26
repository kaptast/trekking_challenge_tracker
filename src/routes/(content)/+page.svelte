<script lang="ts">
	import Button from '$lib/components/Button.svelte'
	import Card from '$lib/components/Card.svelte'
	import Distance from '$lib/components/Distance.svelte'
	import Hero from '$lib/components/Hero.svelte'

	import { m } from '$lib/paraglide/messages'
	import { localizeHref } from '$lib/paraglide/runtime'

	import type { PageProps } from './$types'

	let { data }: PageProps = $props()

	const challengeInfo = $derived(data.challengeInfo)
</script>

<Hero title={m.challengeTitle()}>
	<Button
		label={m.joinTheAdventure()}
		href={localizeHref('/auth')}
		size="large"
		class="font-mono"
	/>
</Hero>

<div class="grid grid-cols-1 gap-4 pt-4 md:grid-cols-12">
	<div class="md:col-start-4 md:col-end-10">
		{#if challengeInfo?.isActive}
			{@const c = challengeInfo.challenge}
			<Card>
				<div class="size-full p-2">
					<h2 class="font-pixel text-4xl leading-5 font-bold text-brown-600 uppercase">{c.name}</h2>

					<p class="text-lg font-bold text-brown-600">
						{m.challengeDateRange({ startDate: c.startDate, endDate: c.endDate })}
					</p>

					<div class="mb-0.5 flex w-full justify-between text-sm font-bold text-brown-600">
						<div>{m.challengeProgress({ percent: challengeInfo.progressPercent })}</div>
						<div>{m.challengeDaysLeft({ days: challengeInfo.daysLeft })}</div>
					</div>

					<div class="chipped-corners bg-brown-600 p-0.5">
						<div class="chipped-corners bg-sand p-0.5">
							<div
								class="chipped-corners h-4 bg-orange-500"
								style="width: {challengeInfo.progressPercent}%"
							></div>
						</div>
					</div>
				</div></Card
			>
		{:else if challengeInfo && !challengeInfo.isActive}
			<Card class="w-full">
				<div class="p-4 text-center">
					<h2 class="text-brown-800 text-lg font-bold uppercase">{m.nextChallenge()}</h2>
					<p class="text-sm font-semibold text-brown-600">
						{challengeInfo.challenge.name} &mdash; {m.nextChallengeStarts({
							date: challengeInfo.challenge.startDate
						})}
					</p>
				</div>
			</Card>
		{:else}
			<Card class="w-full">
				<div class="p-4 text-center">
					<p class="text-sm font-semibold text-brown-600">{m.noChallengeActive()}</p>
				</div>
			</Card>
		{/if}
	</div>

	<Card class="max-md:order-4 md:col-span-4 md:row-start-2">
		<div class="flex h-full flex-col items-center gap-y-2 p-2 text-center">
			<h3 class="text-brown-800 font-sans text-2xl font-bold uppercase">
				{m.uploadAndSync()}
			</h3>

			<div class="flex gap-2">
				<img src="/gpx.png" alt={m.imgAltGpx()} class="size-20 min-h-20 min-w-20" />

				<img src="/strava.png" alt={m.imgAltStrava()} class="size-19 min-h-19 min-w-19" />
			</div>

			<h4 class="text-base font-semibold text-brown-600">{m.uploadAGpxFileOrSnycFromStrava()}</h4>
		</div>
	</Card>

	<Card class="max-md:order-5 md:col-span-4 md:row-start-2">
		<div class="flex h-full flex-col items-center gap-y-2 p-2 text-center">
			<h3 class="text-brown-800 text-2xl font-bold uppercase">{m.createYourOwnTeam()}</h3>

			<img src="/team.png" alt={m.imgAltTeam()} class="w-50 min-w-50" />

			<h4 class="text-base font-semibold text-brown-600">{m.createOrJoinTeam()}</h4>
		</div>
	</Card>

	<Card class="max-md:order-4 md:col-span-4 md:row-start-2">
		<a
			href={localizeHref('/rules')}
			class="flex h-full flex-col items-center gap-y-2 p-2 text-center transition-opacity hover:opacity-80"
		>
			<h3 class="text-brown-800 text-2xl font-bold uppercase">{m.earnPoints()}</h3>

			<img src="/xp.png" alt={m.imgAltXp()} class="size-20 min-h-20 min-w-20" />

			<h4 class="text-base font-semibold text-brown-600">{m.earnPointsForTheLeaderboard()}</h4>
		</a>
	</Card>

	<Card class="max-md:order-1 md:col-span-6">
		<div class="flex size-full flex-col items-center gap-y-2 p-2">
			<h3 class="text-brown-800 font-sans text-2xl font-bold uppercase">
				{m.topTeams()}
			</h3>

			{#await data.teams then teams}
				{#each teams as team, index (index)}
					<div class="grid w-full flex-1 grid-cols-[auto_1fr_auto_auto] gap-x-4 font-semibold">
						<div>{index + 1}.</div>
						<div>{team.name}</div>
						<div>{m.pointsValue({ count: team.points })}</div>
						<div><Distance value={team.totalDistance} /></div>
					</div>
				{/each}
			{/await}

			<div class="flex justify-end px-4 pb-2">
				<Button href={localizeHref('/teams')} label={m.viewLeaderboard()} />
			</div>
		</div>
	</Card>

	<Card class="max-md:order-2 md:col-span-6">
		<div class="grid size-full grid-cols-3 grid-rows-7 place-items-center p-2">
			<h3 class="text-brown-800 col-span-3 text-2xl font-bold uppercase">{m.statistics()}</h3>

			<img
				src="/statistics.png"
				alt={m.imgAltStatistics()}
				class="row-span-6 size-20 min-h-20 min-w-20 place-self-center"
			/>

			{#await data.stats then stats}
				{@const distance = (stats.distance ?? 0) / 1000}
				{@const averageDistance = (stats.averageDistance ?? 0) / 1000}

				<h4 class="col-start-2 justify-self-start text-lg font-semibold text-brown-600">
					{m.total()}
				</h4>
				<h4 class="col-start-3 justify-self-end text-lg font-semibold text-brown-600">
					{m.distanceValue({ distance: distance.toFixed(2) })}
				</h4>

				<h4 class="col-start-2 justify-self-start text-lg font-semibold text-brown-600">
					{m.total()}
				</h4>
				<h4 class="col-start-3 justify-self-end text-lg font-semibold text-brown-600">
					{m.activitiesValue({ count: stats.activityCount })}
				</h4>

				<h4 class="col-start-2 row-start-5 justify-self-start text-lg font-semibold text-brown-600">
					{m.average()}
				</h4>
				<h4 class="col-start-3 row-start-5 justify-self-end text-lg font-semibold text-brown-600">
					{m.distanceValue({ distance: averageDistance.toFixed(2) })}
				</h4>

				<h4 class="col-start-2 row-start-6 justify-self-start text-lg font-semibold text-brown-600">
					{m.average()}
				</h4>
				<h4 class="col-start-3 row-start-6 justify-self-end text-lg font-semibold text-brown-600">
					{m.activitiesValue({ count: stats.averageActivityCountPerUser })}
				</h4>
			{/await}
		</div>
	</Card>
</div>
