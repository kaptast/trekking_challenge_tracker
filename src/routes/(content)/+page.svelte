<script lang="ts">
	import Button from '$lib/components/Button.svelte'
	import Card from '$lib/components/Card.svelte'

	import { m } from '$lib/paraglide/messages'

	import type { PageProps } from './$types'

	let { data }: PageProps = $props()
</script>

<div class="flex flex-col items-center justify-center gap-y-7 py-16">
	<h1 class="text-outline-2 text-outline-black text-5xl font-black text-brown-100 uppercase">
		Túrakihívás 2026
	</h1>

	<Button label="Lépj be a kalandba!" href="/auth" size="large" />
</div>

<div class="grid grid-cols-3 grid-rows-2 gap-4 pt-4">
	<Card>
		<div class="grid place-items-center p-4 text-center">
			<div class="flex gap-2">
				<img src="/gpx.png" alt="GPX file format" class="size-20" />
				<img src="/strava.png" alt="Strava Sync" class="size-20" />
			</div>

			<h3 class="mt-4 text-2xl font-bold text-black uppercase">{m.uploadAndSync()}</h3>
			<h4 class="text-base font-semibold text-black">{m.uploadAGpxFileOrSnycFromStrava()}</h4>
		</div>
	</Card>

	<Card>
		<div class="grid place-items-center p-4 text-center">
			<img src="/team.png" alt="Team" class="h-20" />

			<h3 class="mt-4 text-2xl font-bold text-black uppercase">{m.createYourOwnTeam()}</h3>
			<h4 class="text-base font-semibold text-black">{m.createOrJoinTeam()}</h4>
		</div>
	</Card>

	<Card>
		<div class="grid place-items-center p-4 text-center">
			<img src="/xp.png" alt="XP" class="size-20" />

			<h3 class="mt-4 text-2xl font-bold text-black uppercase">{m.earnPoints()}</h3>
			<h4 class="text-base font-semibold text-black">{m.earnPointsForTheLeaderboard()}</h4>
		</div>
	</Card>

	<Card class="col-span-2">
		<div class="grid place-items-center p-4 text-center">
			<div class="flex gap-2">
				<img src="/gpx.png" alt="GPX file format" class="size-20" />
				<img src="/strava.png" alt="Strava Sync" class="size-20" />
			</div>

			<h3 class="mt-4 text-2xl font-bold text-black uppercase">{m.uploadAndSync()}</h3>
			<h4 class="text-base font-semibold text-black">{m.uploadAGpxFileOrSnycFromStrava()}</h4>
		</div>
	</Card>

	<Card>
		<div class="grid place-items-center p-4 text-center">
			<div class="flex gap-2">
				<img src="/gpx.png" alt="GPX file format" class="size-20" />
				<img src="/strava.png" alt="Strava Sync" class="size-20" />
			</div>

			<h3 class="mt-4 text-2xl font-bold text-black uppercase">{m.uploadAndSync()}</h3>
			<h4 class="text-base font-semibold text-black">{m.uploadAGpxFileOrSnycFromStrava()}</h4>
		</div>
	</Card>
</div>
