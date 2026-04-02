<script lang="ts">
	import Card from '$lib/components/Card.svelte'
	import Hero from '$lib/components/Hero.svelte'
	import { m } from '$lib/paraglide/messages'
</script>

<Hero title={m.rulesTitle()} />

<div class="flex flex-col gap-4 pt-4">
	<Card>
		<div class="flex w-full flex-col gap-4 p-4">
			<p class="text-base font-semibold text-brown-600">{m.rulesIntro()}</p>
		</div>
	</Card>

	<Card>
		<div class="flex w-full flex-col gap-3 p-4">
			<h2 class="text-brown-800 text-xl font-bold uppercase">{m.rulesUploadTitle()}</h2>
			<p class="text-base text-brown-600">{m.rulesUploadDescription()}</p>
		</div>
	</Card>

	<Card>
		<div class="flex w-full flex-col gap-3 p-4">
			<h2 class="text-brown-800 text-xl font-bold uppercase">{m.rulesPointsTitle()}</h2>
			<p class="text-base text-brown-600">{m.rulesPointsDescription()}</p>
			<ul class="flex flex-col gap-2 pl-4">
				<li class="flex items-start gap-2 text-base font-semibold text-brown-600">
					<span class="text-brown-800 mt-1">▶</span>
					{m.rulesWalkHike()}
				</li>
				<li class="flex items-start gap-2 text-base font-semibold text-brown-600">
					<span class="text-brown-800 mt-1">▶</span>
					{m.rulesRun()}
				</li>
				<li class="flex items-start gap-2 text-base font-semibold text-brown-600">
					<span class="text-brown-800 mt-1">▶</span>
					{m.rulesOther()}
				</li>
			</ul>
		</div>
	</Card>

	<Card>
		<div class="flex w-full flex-col gap-3 p-4">
			<h2 class="text-brown-800 text-xl font-bold uppercase">{m.rulesAthleteMultiplierTitle()}</h2>
			<p class="text-base text-brown-600">{m.rulesAthleteMultiplierDescription()}</p>

			<div class="mt-1 border-l-4 border-brown-600 pl-4">
				<h3 class="text-brown-800 text-base font-bold uppercase">{m.rulesExampleTitle()}</h3>
				<p class="text-base text-brown-600">{m.rulesExampleDescription()}</p>
			</div>
		</div>
	</Card>

	<Card>
		<div class="flex w-full flex-col gap-3 p-4">
			<h2 class="text-brown-800 text-xl font-bold uppercase">{m.rulesPrivacyTitle()}</h2>

			<div class="flex flex-col gap-1">
				<h3 class="text-brown-800 text-base font-bold">{m.rulesPrivacyDataCollectedTitle()}</h3>
				<p class="text-base text-brown-600">{m.rulesPrivacyDataCollectedDescription()}</p>
			</div>

			<div class="flex flex-col gap-1">
				<h3 class="text-brown-800 text-base font-bold">{m.rulesPrivacyVisibleTitle()}</h3>
				<p class="text-base text-brown-600">{m.rulesPrivacyVisibleDescription()}</p>
			</div>

			<div class="flex flex-col gap-1">
				<h3 class="text-brown-800 text-base font-bold">{m.rulesPrivacyStravaDisconnectTitle()}</h3>
				<p class="text-base text-brown-600">{m.rulesPrivacyStravaDisconnectDescription()}</p>
			</div>

			<div class="flex flex-col gap-1">
				<h3 class="text-brown-800 text-base font-bold">{m.rulesPrivacyDeleteAccountTitle()}</h3>
				<p class="text-base text-brown-600">{m.rulesPrivacyDeleteAccountDescription()}</p>
			</div>
		</div>
	</Card>
</div>
