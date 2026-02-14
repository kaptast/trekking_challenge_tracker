<script lang="ts">
	import './layout.css'
	import 'dap-design-system/dist/teal.theme.css'
	import favicon from '$lib/assets/favicon.svg'

	import { onMount } from 'svelte'

	let isLoading = $state(true)

	onMount(async () => {
		await import('dap-design-system')
		isLoading = false
	})

	let { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if isLoading}
	<div class="loading-spinner_overlay" data-testid="spinner-layer">
		<div class="loading-spinner">
			<div class="loading-spinner_loader"></div>
			<div class="loading-spinner_spinnerText">Oldal betöltése</div>
		</div>
	</div>
{/if}

<div class="content" class:loaded={!isLoading}>
	{@render children()}
</div>

<style>
	.loading-spinner_overlay {
		position: fixed;
		inset: 0;
		background: white;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
		animation: fadeOut 0.3s ease-out 0.1s forwards;
	}

	.loading-spinner {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.loading-spinner_loader {
		width: 52px;
		height: 52px;
		border: 4px solid #ffffff;
		border-top-color: #005fcc;
		border-radius: 50%;
		animation: loading-spinner_spin 1s linear infinite;
	}

	.loading-spinner_spinnerText {
		margin-top: 1rem;
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--dds-text-neutral);
	}

	.content {
		opacity: 0;
		transition: opacity 0.3s ease-in;
	}

	.content.loaded {
		opacity: 1;
	}

	@keyframes loading-spinner_spin {
		100% {
			transform: rotate(1turn);
		}
	}

	@keyframes fadeOut {
		to {
			opacity: 0;
			pointer-events: none;
		}
	}
</style>
