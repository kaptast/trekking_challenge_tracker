<script lang="ts">
	import { m } from '$lib/paraglide/messages'
	import { localizeHref } from '$lib/paraglide/runtime'

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
		<div class="chipped-corners bg-brown-600">
			{#if user}
				<img src={user?.image || '/avatar.png'} alt={user.name} class="size-10 object-cover" />
			{:else}
				<span>{m.login()}</span>
			{/if}
		</div>
	</div>
</a>
