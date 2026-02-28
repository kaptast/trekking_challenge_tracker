<script lang="ts">
	import type { Snippet } from 'svelte'
	import Wrapper from './Wrapper.svelte'
	import Divider from './Divider.svelte'
	import type { ClassValue } from 'svelte/elements'

	type Props = {
		title: string
		icon?: Snippet
		children: Snippet
		class?: ClassValue
		bottomLeftDecoration?: Snippet
		bottomRightDecoration?: Snippet
	}

	let {
		title,
		icon,
		children,
		bottomLeftDecoration,
		bottomRightDecoration,
		class: className
	}: Props = $props()
</script>

<Wrapper
	class="w-full p-4 {className}"
	backgroundImage="/forest.png"
	{bottomLeftDecoration}
	{bottomRightDecoration}
>
	<div class="flex items-center gap-2">
		{@render icon?.()}
		<h3 class="font-cursive text-2xl font-semibold">{title}</h3>
	</div>

	<Divider />

	{@render children()}
</Wrapper>
