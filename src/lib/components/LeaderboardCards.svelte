<script lang="ts">
	import Card from './Card.svelte'
	import Distance from './Distance.svelte'
	import { m } from '$lib/paraglide/messages'
	import type { AthleteRank } from '$lib/server/leaderboard'

	type Props = {
		walkHikeAthletes: Promise<AthleteRank[]>
		runAthletes: Promise<AthleteRank[]>
		otherAthletes: Promise<AthleteRank[]>
	}

	let { walkHikeAthletes, runAthletes, otherAthletes }: Props = $props()
</script>

{#snippet athleteList(athletes: AthleteRank[])}
	{#if athletes.length === 0}
		<div class="p-4 text-center italic">{m.noData()}</div>
	{:else}
		{#each athletes as athlete, i (i)}
			<div
				class="grid grid-cols-[2rem_1fr_5rem] items-center border-b-2 border-brown-600 px-3 py-2 text-sm font-semibold text-brown-900 last:border-b-0"
			>
				<div class="text-center text-xs">{i + 1}</div>
				<div class="px-2">{athlete.name}</div>
				<div class="text-right"><Distance value={athlete.totalDistance} /></div>
			</div>
		{/each}
	{/if}
{/snippet}

{#snippet leaderCard(title: string, athletes: Promise<AthleteRank[]>)}
	<Card>
		<div class="size-full">
			<div
				class="bg-brown-600 px-3 py-2 text-center text-base font-black tracking-wider text-sand uppercase"
			>
				{title}
			</div>
			<div
				class="grid grid-cols-[2rem_1fr_5rem] items-center border-b-2 border-brown-600 px-3 py-2 text-base font-black tracking-wider text-brown-900"
				style="background-color: oklch(from var(--color-sand) calc(l - 0.05) c h)"
			>
				<div class="text-center text-xs">{m.position()}</div>
				<div class="px-2">{m.name()}</div>
				<div class="text-right">{m.distance()}</div>
			</div>
			{#await athletes}
				<div class="p-4 text-center italic">{m.loading()}</div>
			{:then resolved}
				{@render athleteList(resolved)}
			{:catch}
				<div class="p-4 text-center italic">{m.error()}</div>
			{/await}
		</div>
	</Card>
{/snippet}

<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
	{@render leaderCard(m.walkAndHike(), walkHikeAthletes)}
	{@render leaderCard(m.categoryRun(), runAthletes)}
	{@render leaderCard(m.categoryOther(), otherAthletes)}
</div>
