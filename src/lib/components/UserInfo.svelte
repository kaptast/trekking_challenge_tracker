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

<a href={localizeHref('/auth')}>
	{#if user}
		<img
			src={user?.image || '/avatar.png'}
			alt={user.name}
			class="chipped-corners size-7 object-cover"
		/>
	{:else}
		{m.login()}
	{/if}
</a>
