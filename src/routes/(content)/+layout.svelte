<script lang="ts">
	import Header from '$lib/components/Header.svelte'

	let { children, data } = $props()
</script>

<Header user={data.user} />

<main class="mx-auto max-w-7xl p-4">
	{@render children()}
</main>
