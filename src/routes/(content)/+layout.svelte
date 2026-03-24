<script lang="ts">
	import Header from '$lib/components/Header.svelte'

	let { children, data } = $props()
</script>

<Header user={data.user} />

<main class="mx-auto max-w-7xl px-2 pt-16 pb-4 lg:px-4">
	{@render children()}
</main>
