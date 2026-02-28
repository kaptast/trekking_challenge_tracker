<script lang="ts">
	import Wrapper from './Wrapper.svelte'

	type Props = {
		user:
			| {
					name?: string | null | undefined
					image?: string | null | undefined
			  }
			| undefined
	}

	let { user }: Props = $props()
</script>

<Wrapper>
	<header class="flex items-center justify-between px-3 pb-1">
		<a href="/" aria-label="Home" class="flex items-center gap-2">
			<svg class="size-10" viewBox="0 0 52 49">
				<defs>
					<clipPath id="avatar-clip">
						<path
							d="M26 0.5C40.1117 0.5 51.5 11.2727 51.5 24.5C51.5 37.7273 40.1117 48.5 26 48.5C11.8883 48.5 0.5 37.7273 0.5 24.5C0.5 11.2727 11.8883 0.5 26 0.5Z"
						/>
					</clipPath>
				</defs>
				<image
					href={user?.image ??
						'https://api.dicebear.com/9.x/avataaars/svg?backgroundColor=b6e3f4,c0aede,d1d4f9'}
					x="0"
					y="0"
					width="52"
					height="49"
					preserveAspectRatio="xMidYMid meet"
					clip-path="url(#avatar-clip)"
				/>
				<path
					d="M26 0.5C40.1117 0.5 51.5 11.2727 51.5 24.5C51.5 37.7273 40.1117 48.5 26 48.5C11.8883 48.5 0.5 37.7273 0.5 24.5C0.5 11.2727 11.8883 0.5 26 0.5Z"
					fill="none"
					stroke="#6E7177"
					stroke-width="2"
				/>
			</svg>
		</a>

		<nav class="flex items-center gap-3 text-sm">
			{#if user}
				<span class="text-stone-600">{user.name}</span>
				<a href="/auth" class="text-stone-700 underline hover:no-underline">Account</a>
			{:else}
				<a href="/auth" class="text-stone-700 underline hover:no-underline">Sign in</a>
			{/if}
		</nav>
	</header>
</Wrapper>
