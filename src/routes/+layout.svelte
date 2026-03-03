<script lang="ts">
	import './layout.css'
	import favicon from '$lib/assets/favicon.svg'

	let { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Patrick+Hand&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="content min-h-lvh pt-4">
	{@render children()}
</div>

<style>
	.content {
		background-image: url('/background.png');
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
	}
</style>
