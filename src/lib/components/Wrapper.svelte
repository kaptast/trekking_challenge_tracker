<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { ClassValue } from 'svelte/elements'

	type Props = {
		children: Snippet
		class?: ClassValue
		strokeWidths?: { top?: number; right?: number; bottom?: number; left?: number }
	}

	let { children, class: className, strokeWidths }: Props = $props()

	const sw = $derived({
		top: strokeWidths?.top ?? 1.5,
		right: strokeWidths?.right ?? 1.5,
		bottom: strokeWidths?.bottom ?? 1.5,
		left: strokeWidths?.left ?? 1.5
	})

	let width = $state(0)
	let height = $state(0)

	// Generate a wavy path along the X axis from 0 to `length`
	// amplitude controls how many pixels the line wanders off-axis
	const wavyLine = (length: number, variation: number, amplitude = 1.01): string => {
		const q = length * 0.25
		const h = length * 0.5
		const tq = length * 0.75

		const patterns = [
			`M0,0 Q${q},${amplitude} ${h},0 Q${tq},${-amplitude} ${length},0`,
			`M0,0 Q${q},${-amplitude} ${h},0 Q${tq},${amplitude} ${length},0`,
			`M0,0 Q${q},${amplitude * 0.6} ${h},${-amplitude} Q${tq},${amplitude * 0.6} ${length},0`,
			`M0,0 Q${q},${-amplitude * 0.6} ${h},${amplitude} Q${tq},${-amplitude * 0.6} ${length},0`
		]
		return patterns[variation % patterns.length]
	}

	const topV = Math.floor(Math.random() * 2)
	const rightV = Math.floor(Math.random() * 2)
	const bottomV = Math.floor(Math.random() * 2)
	const leftV = Math.floor(Math.random() * 2)
</script>

<div class="wrapper-container {className}" bind:clientWidth={width} bind:clientHeight={height}>
	{#if width && height}
		<svg class="border-svg">
			<!-- Top: left→right along X -->
			<path d={wavyLine(width, topV)} class="border-line" style="stroke-width: {sw.top}" />
			<!-- Right: top→bottom, rotated 90° around (width, 0) -->
			<path
				d={wavyLine(height, rightV)}
				transform="translate({width},0) rotate(90)"
				class="border-line"
				style="stroke-width: {sw.right}"
			/>
			<!-- Bottom: right→left, rotated 180° around (width, height) -->
			<path
				d={wavyLine(width, bottomV)}
				transform="translate({width},{height}) rotate(180)"
				class="border-line"
				style="stroke-width: {sw.bottom}"
			/>
			<!-- Left: bottom→top, rotated 270° around (0, height) -->
			<path
				d={wavyLine(height, leftV)}
				transform="translate(0,{height}) rotate(270)"
				class="border-line"
				style="stroke-width: {sw.left}"
			/>
		</svg>
	{/if}
	<div class="content">
		{@render children()}
	</div>
</div>

<style>
	.wrapper-container {
		position: relative;
	}

	.border-svg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		overflow: visible;
	}

	.border-line {
		fill: none;
		stroke: #606267;
		stroke-linecap: round;
		vector-effect: non-scaling-stroke;
	}

	.content {
		position: relative;
		z-index: 1;
	}
</style>
