<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { ClassValue } from 'svelte/elements'

	type Props = {
		children?: Snippet
		class?: ClassValue
	}

	let { children, class: className }: Props = $props()
</script>

<div class="chipped-corners bg-black p-0.5 {className}">
	<div
		class="chipped-corners grid size-full place-items-center border-2 border-t-sand-100 border-r-sand-300 border-b-sand-300 border-l-sand-100 bg-brown-100"
	>
		{@render children?.()}
	</div>
</div>
