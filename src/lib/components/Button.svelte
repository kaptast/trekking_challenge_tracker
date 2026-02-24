<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'
	import Wrapper from './Wrapper.svelte'

	type Props = {
		icon?: Snippet
		label: string
		onclick?: () => void
		href?: string
	} & HTMLButtonAttributes &
		HTMLAnchorAttributes

	let { icon, label, onclick, href, ...rest }: Props = $props()

	const isLink = $derived(!!href)
</script>

{#if isLink}
	<a class="inline-block" {href} {...rest}>
		<Wrapper class="px-8 py-1">
			{@render icon?.()}
			{label}
		</Wrapper>
	</a>
{:else}
	<button class="inline-block" {onclick} {...rest}>
		<Wrapper class="px-8 py-1">
			{@render icon?.()}
			{label}
		</Wrapper>
	</button>
{/if}
