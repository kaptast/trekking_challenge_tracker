<script lang="ts">
	import { page } from '$app/state'
	import UserInfo from './UserInfo.svelte'
	import { m } from '$lib/paraglide/messages'
	import { localizeHref, getLocale, setLocale, locales } from '$lib/paraglide/runtime'

	type Props = {
		user:
			| {
					name?: string | null | undefined
					image?: string | null | undefined
			  }
			| undefined
	}

	let { user }: Props = $props()

	const currentLocale = $derived(getLocale())
</script>

{#snippet link(href: string, label: string)}
	{@const active = page.url.pathname === href}
	<a
		{href}
		class={[
			'chipped-corners text-3d border px-2 py-0.5 font-pixel tracking-wider uppercase',
			active
				? ' border-brown-900 bg-brown-800 text-gold-500 text-shadow-gold-800'
				: 'border-brown-600 text-brown-100 text-shadow-black'
		]}
	>
		{label}
	</a>
{/snippet}

<header class="border-y-2 border-black">
	<div class="border-y-4 border-brown-400 bg-brown-600">
		<div
			class="relative mx-auto flex max-w-7xl items-center justify-between gap-x-4 px-4 py-1 font-bold text-brown-100"
		>
			<nav class="flex items-center gap-3">
				{@render link(localizeHref('/'), m.home())}
				{@render link(localizeHref('/activities'), m.activities())}
				{@render link(localizeHref('/teams'), m.teams())}
			</nav>

			<div class=" absolute right-4 flex items-center gap-4">
				<div class="flex items-center gap-1">
					{#each locales as locale (locale)}
						<button
							onclick={() => setLocale(locale)}
							class={[
								'chipped-corners cursor-pointer border px-2 py-0.5 font-pixel text-sm tracking-wider uppercase',
								currentLocale === locale
									? 'border-brown-900 bg-brown-800 text-gold-500 text-shadow-gold-800'
									: 'hover:bg-brown-700 border-brown-600 text-brown-100 text-shadow-black'
							]}
						>
							{locale}
						</button>
					{/each}
				</div>

				<UserInfo {user} />
			</div>
		</div>
	</div>
</header>
