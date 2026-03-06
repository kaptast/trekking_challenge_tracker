<script lang="ts">
	import { page } from '$app/state'
	import UserInfo from './UserInfo.svelte'
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

{#snippet link(href: string, label: string)}
	{@const active = page.url.pathname === href}
	<a
		{href}
		class={[
			'chipped-corners text-3d px-2 py-0.5 font-pixel tracking-wider uppercase',
			active
				? 'border border-brown-900 bg-brown-800 text-gold text-shadow-gold-800'
				: 'text-brown-100 text-shadow-black'
		].join(' ')}
	>
		{label}
	</a>
{/snippet}

<header class="border-y-2 border-black">
	<div class="border-y-4 border-brown-400 bg-brown-600">
		<div class="relative mx-auto flex max-w-7xl items-center gap-x-4 px-4 font-bold text-brown-100">
			<nav class="flex items-center gap-3">
				{@render link(localizeHref('/'), m.home())}
				{@render link(localizeHref('/activities'), m.activities())}
				{@render link(localizeHref('/teams'), m.teams())}
			</nav>

			<UserInfo {user} />
		</div>
	</div>
</header>
