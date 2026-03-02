<script lang="ts">
	import Button from '$lib/components/Button.svelte'
	import Card from '$lib/components/Card.svelte'
	import Hero from '$lib/components/Hero.svelte'

	import { m } from '$lib/paraglide/messages'

	import type { PageProps } from './$types'

	let { data }: PageProps = $props()
</script>

<Hero />

<div class="grid grid-cols-3 gap-4 pt-4">
	<Card title={m.myActivities()}>
		{#await data.activities then activities}
			{#if activities.length > 0}
				<ul class="space-y-2">
					{#each activities as activity}
						<li class="bg-gray-100 flex items-center justify-between rounded-md p-4">
							<div>
								<div class="text-gray-900 text-sm font-medium">{activity.name}</div>
								{#if activity.startDate}
									<div class="text-gray-500 text-sm">
										{new Date(activity.startDate).toLocaleDateString()}
									</div>
								{/if}
							</div>
						</li>
					{/each}
				</ul>
			{/if}
		{/await}
	</Card>

	<Card title={m.myTeam()}>
		{#await data.team then team}
			{#if team}
				<div class="space-y-2">
					<div class="text-gray-900 text-sm font-medium">{team.name}</div>
				</div>
			{/if}
		{/await}
	</Card>

	<Card title={m.leaderboard()}></Card>
</div>
