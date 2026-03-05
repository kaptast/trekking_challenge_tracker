<script lang="ts">
	import { localizeHref } from '$lib/paraglide/runtime'
	import Button from './Button.svelte'

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

<a href={localizeHref('/auth')} class="chipped-corners absolute right-4 bg-black p-0.5">
	<div class="chipped-corners bg-brown-400 p-0.5">
		<div class="chipped-corners bg-brown-600 px-4 py-1">
			{#if user}
				<span class="ml-auto flex items-center gap-x-1">
					<img src={user?.image || '/avatar.png'} alt={user.name} class="size-10 object-cover" />
				</span>
			{:else}
				<span>Sign in</span>
			{/if}
		</div>
	</div>
</a>
