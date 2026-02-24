<script lang="ts">
	import { enhance } from '$app/forms'
	import { page } from '$app/state'
	import { m } from '$lib/paraglide/messages.js'
	import { createTeamDialogState } from './CreateTeamDialog/createTeamDialogState.svelte'
	import Wrapper from './Wrapper.svelte'

	type Props = {
		user:
			| {
					image?: string | null | undefined
			  }
			| undefined
	}

	let { user }: Props = $props()
</script>

<Wrapper>
	<header class="px-3 pb-1">
		<svg class="size-10" viewBox="0 0 52 49">
			<defs>
				<clipPath id="avatar-clip">
					<path
						d="M26 0.5C40.1117 0.5 51.5 11.2727 51.5 24.5C51.5 37.7273 40.1117 48.5 26 48.5C11.8883 48.5 0.5 37.7273 0.5 24.5C0.5 11.2727 11.8883 0.5 26 0.5Z"
					/>
				</clipPath>
			</defs>
			<image
				href="https://api.dicebear.com/9.x/avataaars/svg?backgroundColor=b6e3f4,c0aede,d1d4f9"
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
	</header>
</Wrapper>
