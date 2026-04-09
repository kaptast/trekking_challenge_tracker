<script lang="ts">
	import Hero from '$lib/components/Hero.svelte'
	import LeaderboardCards from '$lib/components/LeaderboardCards.svelte'
	import { m } from '$lib/paraglide/messages'
	import type { PageProps } from './$types'

	let { data }: PageProps = $props()
</script>

<Hero title={m.leaderboards()} />

<LeaderboardCards
	walkHikeAthletes={Promise.resolve(data.walkHikeAthletes)}
	runAthletes={Promise.resolve(data.runAthletes)}
	otherAthletes={Promise.resolve(data.otherAthletes)}
/>
