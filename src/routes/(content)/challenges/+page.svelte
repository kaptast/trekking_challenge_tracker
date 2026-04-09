<script lang="ts">
	import Card from '$lib/components/Card.svelte'
	import Hero from '$lib/components/Hero.svelte'
	import Button from '$lib/components/Button.svelte'
	import { m } from '$lib/paraglide/messages'
	import { localizeHref } from '$lib/paraglide/runtime'
	import type { PageProps } from './$types'

	let { data }: PageProps = $props()

	function formatDate(date: string) {
		return new Date(date).toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		})
	}
</script>

<Hero title={m.challenges()} />

<Card>
	<div class="w-full">
		<div class="row header">
			<div>{m.name()}</div>
			<div>{m.date()}</div>
			<div></div>
		</div>

		{#await data.challenges}
			<div class="row"><div class="col-span-3 p-4 text-center italic">{m.loading()}</div></div>
		{:then challenges}
			{#if challenges.length === 0}
				<div class="row">
					<div class="col-span-3 p-4 text-center italic">{m.noChallenges()}</div>
				</div>
			{:else}
				{#each challenges as challenge (challenge.id)}
					<div class="row">
						<div class="font-semibold">{challenge.name}</div>
						<div>
							{m.challengeDateRange({
								startDate: formatDate(challenge.startDate),
								endDate: formatDate(challenge.endDate)
							})}
						</div>
						<div class="flex justify-end">
							<Button
								href={localizeHref(`/challenges/${challenge.id}`)}
								label={m.leaderboard()}
								size="small"
							/>
						</div>
					</div>
				{/each}
			{/if}
		{:catch}
			<div class="row"><div class="col-span-3 p-4 text-center italic">{m.error()}</div></div>
		{/await}
	</div>
</Card>

<style>
	.row {
		display: grid;
		grid-template-columns: 1fr 1fr auto;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		border-bottom: 2px solid var(--color-brown-600);
		font-size: 0.875rem;
		color: var(--color-brown-900);
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

	@media (max-width: 480px) {
		.row {
			grid-template-columns: 1fr auto;
		}

		.row > :nth-child(2) {
			display: none;
		}

		.row.header > :nth-child(2) {
			display: none;
		}
	}
</style>
