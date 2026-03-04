<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { ClassValue } from 'svelte/elements'

	type Props = {
		children?: Snippet
		header?: Snippet
		class?: ClassValue
		title?: string
	}

	let { children, header, class: className, title }: Props = $props()
</script>

<div class="size-full p-4">
	{#if title}
		<h2 class="text-center text-xl leading-none font-bold text-black uppercase">{title}</h2>
		<div class="my-2 w-full border-b-2 border-brown-200"></div>
	{/if}

	<div class="table w-full">
		{@render header?.()}
		{@render children?.()}
	</div>
</div>

<style>
	.table > :global(div) {
		width: 100%;
		background-color: var(--color-brown-300);
		border: 2px solid var(--color-brown-200);
		padding: 0.5rem;
		clip-path: polygon(
			0 4px,
			2px 4px,
			2px 2px,
			4px 2px,
			4px 0,
			calc(100% - 4px) 0,
			calc(100% - 4px) 2px,
			calc(100% - 2px) 2px,
			calc(100% - 2px) 4px,
			100% 4px,
			100% calc(100% - 4px),
			calc(100% - 2px) calc(100% - 4px),
			calc(100% - 2px) calc(100% - 2px),
			calc(100% - 4px) calc(100% - 2px),
			calc(100% - 4px) 100%,
			4px 100%,
			4px calc(100% - 2px),
			2px calc(100% - 2px),
			2px calc(100% - 4px),
			0 calc(100% - 4px)
		);
	}
</style>
