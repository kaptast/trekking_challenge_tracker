<script lang="ts">
	import type { ClassValue, HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'

	type Props = {
		label: string
		onclick?: () => void
		href?: string
		class?: ClassValue
		variant?: 'primary' | 'secondary' | 'strava'
		size?: 'small' | 'medium' | 'large'
	} & HTMLButtonAttributes &
		HTMLAnchorAttributes

	let {
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
	<a class="chipped-corners inline-block cursor-pointer bg-brown-900 p-1" {href} {...rest}>
		<span
			class="{className} chipped-corners block border-4 border-t-orange-300 border-r-orange-400 border-b-orange-700 border-l-orange-300 px-3 text-center font-pixel font-bold uppercase {variant} {size}"
		>
			{label}
		</span>
	</a>
{:else}
	<button class="chipped-corners cursor-pointer bg-brown-900 p-1" {onclick} {...rest}>
		<span class="chipped-corners block p-1">
			<span
				class="{className} chipped-corners block border-2 border-t-orange-300 border-r-orange-400 border-b-orange-700 border-l-orange-300 px-4 py-1 text-center font-pixel font-bold uppercase {variant} {size}"
			>
				{label}
			</span>
		</span>
	</button>
{/if}

<style>
	.primary {
		color: var(--color-brown-600);
		background-color: var(--color-orange-500);
	}

	.primary:hover {
		background-color: var(--color-orange-400);
	}

	.primary:active {
		background-color: var(--color-orange-400);
	}

	.secondary {
		background-color: var(--color-olive-300);
	}

	.strava {
		color: #fff;
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
