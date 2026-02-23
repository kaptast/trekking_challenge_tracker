<script lang="ts">
	import type { Snippet } from 'svelte'

	type Props = {
		children: Snippet
	}

	let { children }: Props = $props()
</script>

<div class="wireframe-card">
	{@render children()}
</div>

<style>
	.wireframe-card {
		background-color: #fff;
		padding: 20px;
		border: 2px solid #4a4a4a;

		/* This creates a "complex" radius. 
     The values are slightly off-center (e.g., 255px vs 15px) 
     to prevent perfect symmetry.
  */
		border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;

		/* Ensuring the content doesn't bleed over the sketchy edge */
		overflow: hidden;

		/* Font styling to match the vibe */
		font-family: 'Segoe Print', 'Comic Sans MS', cursive;
	}
</style>
