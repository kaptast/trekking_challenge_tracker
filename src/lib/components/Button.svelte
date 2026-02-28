<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { ClassValue, HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'
	import Wrapper from './Wrapper.svelte'

	type Props = {
		icon?: Snippet
		label: string
		onclick?: () => void
		href?: string
		class?: ClassValue
	} & HTMLButtonAttributes &
		HTMLAnchorAttributes

	let { icon, label, onclick, href, class: className, ...rest }: Props = $props()

	const isLink = $derived(!!href)
</script>

{#if isLink}
	<a class="inline-block" {href} {...rest}>
		<Wrapper
			class="px-12 py-1 text-center {className}"
			strokeWidths={{ top: 1.5, right: 2.5, bottom: 2.5, left: 2.5 }}
		>
			{@render icon?.()}
			{label}
		</Wrapper>
	</a>
{:else}
	<button class="inline-block" {onclick} {...rest}>
		<Wrapper
			class="px-12 py-1 text-center {className}"
			strokeWidths={{ top: 1.5, right: 2.5, bottom: 2.5, left: 2.5 }}
		>
			{@render icon?.()}
			{label}
		</Wrapper>
	</button>
{/if}
