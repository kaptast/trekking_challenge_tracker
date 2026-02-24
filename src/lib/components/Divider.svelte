<script lang="ts">
	let width = $state(0)

	const wavyLine = (length: number, amplitude = 1.5): string => {
		const q = length * 0.25
		const h = length * 0.5
		const tq = length * 0.75
		return `M0,0 Q${q},${amplitude} ${h},0 Q${tq},${-amplitude} ${length},0`
	}
</script>

<div class="divider-container" bind:clientWidth={width}>
	{#if width}
		<svg class="divider-svg" height="6" style="width: {width}px">
			<path d={wavyLine(width)} class="divider-line" transform="translate(0,3)" />
		</svg>
	{/if}
</div>

<style>
	.divider-container {
		width: 100%;
		opacity: 0.8;
		transform: rotate(-0.2deg);
	}

	.divider-svg {
		display: block;
		overflow: visible;
	}

	.divider-line {
		fill: none;
		stroke: #606267;
		stroke-width: 1.5;
		stroke-linecap: round;
		vector-effect: non-scaling-stroke;
	}
</style>
