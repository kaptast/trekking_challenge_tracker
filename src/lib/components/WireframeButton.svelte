<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'

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
	<a class="wireframe-button" {href} {...rest}>
		{@render icon?.()}
		{label}
	</a>
{:else}
	<button class="wireframe-button" {onclick} {...rest}>
		{@render icon?.()}
		{label}
	</button>
{/if}

<style>
	/* Styling for the hand-drawn wireframe button */
	.wireframe-button {
		/* 1. Typography */
		/* Using system fallback fonts that look handwritten */
		font-family: 'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', cursive, sans-serif;
		font-size: 16px;
		font-weight: 600;
		color: #3b4045;

		/* 2. Core Button Styles */
		background-color: #ffffff;
		padding: 8px 24px;
		cursor: pointer;

		/* 3. The Sketchy Border */
		border: 2px solid #5c6166;
		/* This specific border-radius creates a slightly uneven, hand-drawn rectangle */
		border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;

		/* 4. The Solid Drop Shadow */
		/* x-offset, y-offset, blur-radius (0 for solid edge), color */
		box-shadow: 3px 3px 0px #b3b8bc;

		/* Smooth transition for the hover effect */
		transition: all 0.15s ease-in-out;
	}

	.wireframe-button:hover {
		box-shadow: 1px 1px 0px #b3b8bc;
		transform: translate(2px, 2px);
	}

	.wireframe-button:focus {
		outline: none;
		border-color: #2b2f33;
	}
</style>
