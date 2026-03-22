<script lang="ts">
	import Header from '$lib/components/Header.svelte'

	let { children, data } = $props()
</script>

<Header user={data.user} />

<main class="mx-auto max-w-7xl px-4 pb-4 pt-16">
	{@render children()}
</main>
