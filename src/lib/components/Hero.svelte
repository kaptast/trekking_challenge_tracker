<script lang="ts">
	import type { Snippet } from 'svelte'

	type Props = {
		title: string
		children?: Snippet
	}

	let { title, children }: Props = $props()

	const hasChildren = $derived(children !== undefined)
</script>

<div
	class={['flex flex-col items-center justify-center gap-y-7', hasChildren ? 'py-16' : 'pt-8 pb-2']}
>
	<h1
		class="text-3d text-3d-thickest font-pixel text-7xl text-orange-500 uppercase text-shadow-brown-600"
	>
		{title}
	</h1>

	{@render children?.()}
</div>
