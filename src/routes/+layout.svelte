<script lang="ts">
	import './layout.css'
	import favicon from '$lib/assets/favicon.svg'

	let { children } = $props()

	let eagleVisible = $state(false)
	let eagleFromRight = $state(false)
	let eagleY = $state(30)
	let eagleDuration = $state(8)

	$effect(() => {
		let timeout: ReturnType<typeof setTimeout>

		function triggerEagle() {
			eagleFromRight = Math.random() > 0.5
			eagleY = 8 + Math.random() * 55
			eagleDuration = 6 + Math.random() * 7
			eagleVisible = true
			timeout = setTimeout(
				() => {
					eagleVisible = false
					scheduleNext()
				},
				eagleDuration * 1000 + 500
			)
		}

		function scheduleNext() {
			const delay = 12000 + Math.random() * 23000
			timeout = setTimeout(triggerEagle, delay)
		}

		scheduleNext()

		return () => clearTimeout(timeout)
	})
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="bg fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"></div>

<div class="content relative z-2 min-h-lvh pt-4">
	{@render children()}
</div>

{#if eagleVisible}
	<img
		src="/eagle.png"
		alt=""
		class={['eagle point fixed z-1 h-auto w-15', eagleFromRight && 'from-left']}
		style="top: {eagleY}vh; animation-duration: {eagleDuration}s"
	/>
{/if}

<style>
	.bg {
		background-image: url('/background.png');
	}

	.eagle {
		animation-name: flyRightToLeft;
		animation-timing-function: linear;
		animation-fill-mode: forwards;
	}

	.eagle.from-left {
		animation-name: flyLeftToRight;
		transform: scaleX(-1);
	}

	@keyframes flyLeftToRight {
		from {
			left: -110px;
		}
		to {
			left: calc(100vw + 110px);
		}
	}

	@keyframes flyRightToLeft {
		from {
			left: calc(100vw + 110px);
		}
		to {
			left: -110px;
		}
	}
</style>
