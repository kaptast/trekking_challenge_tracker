<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { ClassValue } from 'svelte/elements'

	type Props = {
		children?: Snippet
		class?: ClassValue
	}

	let { children, class: className }: Props = $props()
</script>

<div class="chipped-corners bg-brown-900 p-1 {className}">
	<div class="chipped-corners size-full bg-brown-300 p-1">
		<div class="chipped-corners size-full bg-brown-900 p-px">
			<div class="chipped-corners grid size-full place-items-center border bg-sand">
				{@render children?.()}
			</div>
		</div>
	</div>
</div>
