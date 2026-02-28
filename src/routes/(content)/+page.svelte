<script lang="ts">
	import Button from '$lib/components/Button.svelte'
	import Card from '$lib/components/Card.svelte'
	import Hero from '$lib/components/Hero.svelte'
</script>

<Hero />

<div class="space-y-2 p-10">
	<div class="flex gap-2">
		<Card title="My Group">
			<h4 class="font-cursive text-xl">Mountain Goats</h4>

			<div class="mt-2 grid grid-rows-2 place-content-center gap-2">
				<Button label="Create Group" href="/groups/create" />
				<Button label="Join Group" href="/groups" />
			</div>
		</Card>

		<Card title="My Activity Summary">
			<div>
				<span>This Week: 42 km</span>
				<span>Elevation: 1,250 m</span>
				<span>Activities: 3</span>
			</div>

			<div class="mt-2 grid grid-rows-2 place-content-center gap-2">
				<Button label="Sync with Strava" href="/activities/sync" variant="strava" />
				<Button label="Import GPX" href="/activities/import" />
			</div>
		</Card>
	</div>

	<Card title="Recent Group Activities">
		<ul>
			<li>
				<strong>Alice</strong> hiked 15 km in the Alps. (2h ago)
			</li>
			<li>
				<strong>Bob</strong> biked 30 km in the Rockies. (5h ago)
			</li>
			<li>
				<strong>Charlie</strong> ran 10 km in the city. (1d ago)
			</li>
		</ul>

		<div class="mt-2 grid place-content-center">
			<Button label="View All Activities" href="/activities" />
		</div>
	</Card>
</div>
