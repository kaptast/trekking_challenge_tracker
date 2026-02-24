<script lang="ts">
	import Button from '$lib/components/Button.svelte'
	import Card from '$lib/components/Card.svelte'
	import Divider from '$lib/components/Divider.svelte'
</script>

<div class="space-y-2 p-10">
	<Card title="Active Challenge">
		{#snippet icon()}
			🥇
		{/snippet}

		<h4 class="font-cursive text-xl">Spring Alpine Quest</h4>
		<p class="font-serif">Group: Mountain Goats</p>

		<Button label="View details" href="/challenges/1" />
	</Card>

	<div class="flex gap-2">
		<Card title="My Group">
			{#snippet icon()}
				🥇
			{/snippet}

			<h4 class="font-cursive text-xl">Mountain Goats</h4>

			<Button label="Create Group" href="/groups/create" />
			<Button label="Join Group" href="/groups" />
		</Card>

		<Card title="My Activity Summary">
			{#snippet icon()}
				🥇
			{/snippet}

			<div>
				<span>This Week: 42 km</span>
				<Divider />
				<span>Elevation: 1,250 m</span>
				<Divider />
				<span>Activities: 3</span>
				<Divider />
			</div>

			<Button label="Sync with Strava" href="/activities/sync" />
			<Button label="Import GPX" href="/activities/import" />
		</Card>
	</div>

	<Card title="Recent Group Activities">
		{#snippet icon()}
			🥇
		{/snippet}

		<ul>
			<li>
				<strong>Alice</strong> hiked 15 km in the Alps. (2h ago)
				<Divider />
			</li>
			<li>
				<strong>Bob</strong> biked 30 km in the Rockies. (5h ago)
				<Divider />
			</li>
			<li>
				<strong>Charlie</strong> ran 10 km in the city. (1d ago)
				<Divider />
			</li>
		</ul>

		<Button label="View All Activities" href="/activities" />
	</Card>
</div>
