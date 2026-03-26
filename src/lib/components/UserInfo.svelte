<script lang="ts">
	import { m } from '$lib/paraglide/messages'
	import { localizeHref } from '$lib/paraglide/runtime'
	import { pixelArt } from '@dicebear/collection'
	import { createAvatar } from '@dicebear/core'

	type Props = {
		user:
			| {
					name?: string | null | undefined
					image?: string | null | undefined
					avatarSeed?: string | null | undefined
			  }
			| undefined
	}

	let { user }: Props = $props()

	const image = $derived(
		user?.image ??
			createAvatar(pixelArt, {
				seed: user?.avatarSeed ?? user?.name ?? 'default-avatar',
				size: 128
			}).toDataUri()
	)
</script>

<a href={localizeHref('/auth')}>
	{#if user}
		<img src={image} alt={user.name} class="chipped-corners size-7 object-cover" />
	{:else}
		<span class="font-pixel text-xl leading-7.5 text-brown-900 uppercase">{m.login()}</span>
	{/if}
</a>
