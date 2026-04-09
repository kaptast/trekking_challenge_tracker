<script lang="ts">
	import Hero from '$lib/components/Hero.svelte'
	import LeaderboardCards from '$lib/components/LeaderboardCards.svelte'
	import { m } from '$lib/paraglide/messages'
	import type { PageProps } from './$types'

	let { data }: PageProps = $props()
</script>

<Hero title={data.challenge.name}>
	<p class="text-brown-700 text-base font-semibold">
		{m.challengeDateRange({
			startDate: data.challenge.startDate,
			endDate: data.challenge.endDate
		})}
	</p>
</Hero>

<LeaderboardCards
	walkHikeAthletes={data.walkHikeAthletes}
	runAthletes={data.runAthletes}
	otherAthletes={data.otherAthletes}
/>
