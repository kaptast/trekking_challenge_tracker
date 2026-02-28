<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { ClassValue, HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'

	type Props = {
		icon?: Snippet
		label: string
		onclick?: () => void
		href?: string
		class?: ClassValue
		variant?: 'primary' | 'secondary' | 'strava'
	} & HTMLButtonAttributes &
		HTMLAnchorAttributes

	let {
		icon,
		label,
		onclick,
		href,
		class: className,
		variant = 'primary',
		...rest
	}: Props = $props()

	const isLink = $derived(!!href)
</script>

{#if isLink}
	<a class="chipped-corners inline-block cursor-pointer bg-black p-0.5" {href} {...rest}>
		<span class="chipped-corners block bg-sand p-1">
			<span
				class="{className} chipped-corners block px-4 py-1 text-center font-bold uppercase {variant} "
			>
				{label}
			</span>
		</span>
	</a>
{:else}
	<button class="chipped-corners cursor-pointer bg-black p-0.5" {onclick} {...rest}>
		<span class="chipped-corners block bg-sand p-1">
			<span
				class="{className} chipped-corners block px-4 py-1 text-center font-bold uppercase {variant} "
			>
				{label}
			</span>
		</span>
	</button>
{/if}

<style>
	.primary {
		color: var(--color-sand-light);
		background-color: var(--color-green);
	}

	.secondary {
		color: var(--color-sand-light);
		background-color: var(--color-blue);
	}

	.strava {
		color: var(--color-black);
		background-color: var(--color-orange);
	}
</style>
