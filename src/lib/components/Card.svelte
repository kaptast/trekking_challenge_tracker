<script lang="ts">
	import type { Snippet } from 'svelte'
	import Wrapper from './Wrapper.svelte'
	import Divider from './Divider.svelte'

	type Props = {
		title: string
		icon?: Snippet
		children: Snippet
	}

	let { title, icon, children }: Props = $props()
</script>

<Wrapper class="w-full p-4">
	<div class="flex items-center gap-2">
		{@render icon?.()}
		<h3 class="font-cursive text-2xl font-semibold">{title}</h3>
	</div>

	<!-- <Divider /> -->

	{@render children()}
</Wrapper>
