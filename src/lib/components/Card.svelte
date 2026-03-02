<script lang="ts">
	import type { Snippet } from 'svelte'

	type Props = {
		title: string
		children?: Snippet
	}

	let { title, children }: Props = $props()
</script>

<div class="relative bg-sand p-1">
	<div class="chipped-corners relative z-10 bg-black p-0.5">
		<div class="chipped-corners bg-sand p-1">
			<div
				class="chipped-corners block bg-blue-dark px-4 py-1 text-center font-bold text-sand-light uppercase"
			>
				{title}
			</div>
		</div>
	</div>

	<div class="chipped-corners z-0 mx-1 -mt-3 mb-1 bg-black p-0.5">
		<div class="chipped-corners bg-blue-dark px-2 pt-4 pb-1">
			{@render children?.()}
		</div>
	</div>
</div>
