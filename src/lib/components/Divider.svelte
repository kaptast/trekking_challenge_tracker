<hr class="sketchy-divider" />

<style>
	.sketchy-divider {
		/* 1. Dimensions */
		height: 2px;
		width: 100%;

		/* 2. The "Ink" Color */
		background-color: #5c6166;

		/* 3. The Sketchy Shape */
		/* We use a tiny border-radius to make the ends of the line 
     look like a marker tip rather than a perfect square */
		border-radius: 20% 80% 20% 80% / 80% 20% 80% 20%;

		/* 4. The Human Error (Optional) */
		/* A tiny rotation (0.2 degrees) makes it look like it 
     was drawn slightly off-level */
		transform: rotate(-0.2deg);

		/* 5. Natural thickness variation */
		/* Using a subtle scale or box-shadow can mimic ink bleed */
		opacity: 0.8;
	}
</style>
