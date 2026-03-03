<script lang="ts">
	import './layout.css'
	import favicon from '$lib/assets/favicon.svg'

	let { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
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
