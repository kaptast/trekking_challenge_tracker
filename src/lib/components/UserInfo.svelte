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

<a href={localizeHref('/auth')} class="pt-1">
	<div class="chipped-corners bg-black p-0.5">
		<div class="chipped-corners bg-brown-400 p-0.5">
			{#if user}
				<div class="chipped-corners bg-brown-600">
					<img src={user?.image || '/avatar.png'} alt={user.name} class="size-11 object-cover" />
				</div>
			{:else}
				<div class="chipped-corners bg-brown-600 px-1">
					{m.login()}
				</div>
			{/if}
		</div>
	</div>
</a>
