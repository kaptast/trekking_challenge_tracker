<script lang="ts">
	type Props = {
		name?: string
		checked?: boolean
		value: string | number
		onchange?: (checked: boolean) => void
	}

	let { name, checked = false, value, onchange }: Props = $props()
</script>

<label class="checkbox inline-flex cursor-pointer">
	<input
		type="checkbox"
		class="sr-only"
		{name}
		{checked}
		{value}
		onchange={(e: unknown) => {
			if ((e as Event & { target: HTMLInputElement }).target.checked) {
				onchange?.(true)
			} else {
				onchange?.(false)
			}
		}}
	/>
	<span
		class="chipped-corners inline-flex size-7 place-content-center items-center justify-center bg-brown-900 p-0.75 transition-colors"
	>
		<span
			class="inner chipped-corners flex size-full items-center justify-center border-3 bg-sand pt-0.5 text-transparent"
			class:checked
		>
			<svg
				width="10"
				height="10"
				viewBox="0 0 10 10"
				shape-rendering="crispEdges"
				fill="currentColor"
				style:visibility={checked ? 'visible' : 'hidden'}
			>
				<path
					d="M9 0 H10 V1 H9 Z M8 1 H10 V2 H8 Z M7 2 H9 V3 H7 Z M1 3 H2 V4 H1 Z M6 3 H8 V4 H6 Z M1 4 H3 V5 H1 Z M5 4 H7 V5 H5 Z M2 5 H6 V6 H2 Z M3 6 H5 V7 H3 Z"
				/>
			</svg>
		</span>
	</span>
</label>

<style>
	.checkbox:hover .inner {
		background-color: oklch(from var(--color-sand) calc(l + 0.05) c h);
	}

	.checkbox:hover .inner.checked {
		background-color: oklch(from var(--color-orange-500) calc(l + 0.05) c h);
	}

	.inner {
		border-top-color: oklch(from var(--color-sand) calc(l + 0.05) c h);
		border-right-color: oklch(from var(--color-sand) calc(l - 0.07) c h);
		border-bottom-color: oklch(from var(--color-sand) calc(l - 0.1) c h);
		border-left-color: oklch(from var(--color-sand) calc(l + 0.05) c h);
	}

	.inner.checked {
		background-color: var(--color-orange-500);
		border-top-color: oklch(from var(--color-orange-500) calc(l + 0.1) c h);
		border-right-color: oklch(from var(--color-orange-500) calc(l - 0.05) c h);
		border-bottom-color: oklch(from var(--color-orange-500) calc(l - 0.1) c h);
		border-left-color: oklch(from var(--color-orange-500) calc(l + 0.1) c h);
		color: var(--color-brown-900);
	}
</style>
