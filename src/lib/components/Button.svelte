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
		size?: 'small' | 'medium' | 'large'
	} & HTMLButtonAttributes &
		HTMLAnchorAttributes

	let {
		icon,
		label,
		onclick,
		href,
		class: className,
		variant = 'primary',
		size = 'medium',
		...rest
	}: Props = $props()

	const isLink = $derived(!!href)
</script>

{#if isLink}
	<a class="chipped-corners inline-block cursor-pointer bg-black p-0.5 pb-1" {href} {...rest}>
		<span class="chipped-corners block bg-brown-200 p-1">
			<span
				class="{className} chipped-corners text-outline text-outline-black block px-4 py-1 text-center font-pixel font-bold uppercase {variant} {size}"
			>
				{label}
			</span>
		</span>
	</a>
{:else}
	<button class="chipped-corners cursor-pointer bg-black p-0.5 pb-1" {onclick} {...rest}>
		<span class="chipped-corners block bg-brown-200 p-1">
			<span
				class="{className} chipped-corners text-outline text-outline-black block px-4 py-1 text-center font-pixel font-bold uppercase {variant} {size}"
			>
				{label}
			</span>
		</span>
	</button>
{/if}

<style>
	.primary {
		color: var(--color-brown-100);
		background-color: var(--color-brown-450);
	}

	.secondary {
		color: var(--color-brown-100);
		background-color: var(--color-olive-500);
	}

	.strava {
		color: var(--color-black);
		background-color: #fc5200;
	}

	.medium {
		font-size: 1rem;
	}

	.small {
		font-size: 0.875rem;
	}

	.large {
		font-size: 2rem;
	}
</style>
