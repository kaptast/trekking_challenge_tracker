<script lang="ts">
	import Button from '$lib/components/WireframeButton.svelte'
	import Card from '$lib/components/Card.svelte'
	import Divider from '$lib/components/Divider.svelte'
</script>

<Card>
	<div class="w-fit p-2">
		<h3>🥇 Mountain Goats</h3>
		<Divider />
		<p>812 km</p>

		<Button label="View details" href="/teams/1" />
	</div>
</Card>
