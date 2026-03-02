<script lang="ts">
	import { m } from '$lib/paraglide/messages'
	import Button from './Button.svelte'
	import Card from './Card.svelte'
</script>

<div class="hero chipped-corners flex flex-col items-center border-2 border-black pt-20 pb-10">
	<h1 class="mb-8 text-4xl font-black text-sand-light uppercase text-shadow-black text-shadow-lg">
		{m.title()}
	</h1>

	<Card title={m.activeChallenge()}>
		<div class="mx-auto w-4/5 space-y-2">
			<h4 class="text-xl font-medium">Spring Alpine Quest</h4>
			<p class="text-lg">Group: Mountain Goats</p>

			<div class="mx-auto w-fit">
				<Button label={m.details()} href="/challenges/1" />
			</div>
		</div>
	</Card>
</div>

<style>
	.hero {
		background-image: url('/hero.png');
		background-size: cover;
		background-position: center;
	}
</style>
