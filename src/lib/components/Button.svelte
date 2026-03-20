<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { ClassValue, HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'

	type Props = {
		label?: string
		children?: Snippet
		onclick?: () => void
		href?: string
		class?: ClassValue
		variant?: 'primary' | 'secondary' | 'strava' | 'delete'
		size?: 'small' | 'medium' | 'large'
	} & HTMLButtonAttributes &
		HTMLAnchorAttributes

	let {
		label,
		children,
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
			class="{className} chipped-corners block border-4 px-3 text-center font-pixel uppercase transition-colors {variant} {size}"
		>
			{#if label}
				{label}
			{:else}
				{@render children?.()}
			{/if}
		</span>
	</a>
{:else}
	<button class="chipped-corners cursor-pointer bg-brown-900 p-1" {onclick} {...rest}>
		<span
			class="{className} chipped-corners block border-4 px-3 text-center font-pixel uppercase transition-colors {variant} {size}"
		>
			{#if label}
				{label}
			{:else}
				{@render children?.()}
			{/if}
		</span>
	</button>
{/if}

<style>
	.primary {
		color: var(--color-brown-600);
		background-color: var(--color-orange-500);
		border-top-color: oklch(from var(--color-orange-500) calc(l + 0.1) c h);
		border-right-color: oklch(from var(--color-orange-500) calc(l - 0.05) c h);
		border-bottom-color: oklch(from var(--color-orange-500) calc(l - 0.1) c h);
		border-left-color: oklch(from var(--color-orange-500) calc(l + 0.1) c h);
	}

	.primary.active {
		background-color: var(--color-brown-900);
		border: none;
		color: var(--color-sand);
	}

	.primary:hover {
		background-color: oklch(from var(--color-orange-500) calc(l + 0.05) c h);
	}

	.primary.active:hover {
		background-color: var(--color-brown-600);
	}

	.secondary {
		border-top-color: oklch(from var(--color-olive-300) calc(l + 0.1) c h);
		border-right-color: oklch(from var(--color-olive-300) calc(l - 0.05) c h);
		border-bottom-color: oklch(from var(--color-olive-300) calc(l - 0.1) c h);
		border-left-color: oklch(from var(--color-olive-300) calc(l + 0.1) c h);
		background-color: var(--color-olive-300);
	}

	.secondary:hover {
		background-color: oklch(from var(--color-olive-300) calc(l + 0.05) c h);
	}

	.delete {
		color: #fff;
		border-top-color: oklch(from red calc(l + 0.1) c h);
		border-right-color: oklch(from red calc(l - 0.1) c h);
		border-bottom-color: oklch(from red calc(l - 0.1) c h);
		border-left-color: oklch(from red calc(l + 0.1) c h);
		background-color: red;
	}

	.strava {
		color: #fff;
		border-top-color: oklch(from #fc5200 calc(l + 0.1) c h);
		border-right-color: oklch(from #fc5200 calc(l - 0.1) c h);
		border-bottom-color: oklch(from #fc5200 calc(l - 0.1) c h);
		border-left-color: oklch(from #fc5200 calc(l + 0.1) c h);
		background-color: #fc5200;
	}

	.medium {
		font-weight: normal;
		font-size: 1.5rem;
		line-height: 2rem;
	}

	.small {
		font-weight: normal;
		font-size: 1.25rem;
		line-height: 1.25rem;
	}

	.large {
		font-weight: bold;
		font-size: 2.5rem;
		line-height: 3rem;
	}
</style>
