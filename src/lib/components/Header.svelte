<script lang="ts">
	import { page } from '$app/state'
	import UserInfo from './UserInfo.svelte'
	import { m } from '$lib/paraglide/messages'
	import { localizeHref } from '$lib/paraglide/runtime'
	import LanguageSwitcher from './LanguageSwitcher.svelte'
	import Button from './Button.svelte'
	import { onNavigate } from '$app/navigation'
	import { MediaQuery } from 'svelte/reactivity'
	import { slide } from 'svelte/transition'

	type Props = {
		user:
			| {
					name?: string | null | undefined
					image?: string | null | undefined
			  }
			| undefined
	}

	let { user }: Props = $props()

	let open = $state(false)

	onNavigate(() => {
		open = false
	})

	function toggleMenu() {
		open = !open
	}

	const isMobile = new MediaQuery('max-width: 640px')

	const menuOpen = $derived(open && isMobile.current)
</script>

<header class="fixed inset-x-0 top-0 z-50 w-screen border-y-2 border-brown-900">
	<div class="h-13.5 border-b-4 border-brown-300 bg-brown-600">
		<div
			class="text-brown-100 flex h-full max-w-7xl items-center justify-between gap-x-4 px-2 py-0.5 font-bold sm:mx-auto sm:px-4"
		>
			<button
				title={menuOpen ? m.closeMenu() : m.openMenu()}
				onclick={toggleMenu}
				aria-pressed={menuOpen}
				class="relative size-6 cursor-pointer sm:hidden"
			>
				<span
					class={[
						'absolute block h-1 bg-sand transition-all duration-300',
						menuOpen ? 'top-2.5 left-1/2 w-0' : 'top-0 left-0 w-full'
					]}
				></span>
				<span
					class={[
						'absolute top-2.5 left-0 block h-1 w-full bg-sand transition-transform duration-300',
						menuOpen && 'rotate-45'
					]}
				></span>
				<span
					class={[
						'absolute top-2.5 left-0 block h-1 w-full bg-sand transition-transform duration-300',
						menuOpen && '-rotate-45'
					]}
				></span>
				<span
					class={[
						'absolute block h-1 bg-sand transition-all duration-300',
						menuOpen ? 'top-2.5 left-1/2 w-0' : 'top-5 left-0 w-full'
					]}
				></span>
			</button>

			<nav class="hidden items-center sm:flex">
				<Button
					href={localizeHref('/')}
					label={m.home()}
					class={[page.route.id === '/(content)' && 'active']}
				/>
				<Button
					href={localizeHref('/activities')}
					label={m.activities()}
					class={[page.route.id === '/(content)/activities' && 'active']}
				/>
				<Button
					href={localizeHref('/teams')}
					label={m.teams()}
					class={[page.route.id === '/(content)/teams' && 'active']}
				/>
			</nav>

			<div class="chipped-corners flex items-center gap-x-1 bg-brown-300 p-1">
				<div class="chipped-corners bg-sand p-1">
					<LanguageSwitcher />
				</div>

				<div class="chipped-corners bg-sand p-1">
					<UserInfo {user} />
				</div>
			</div>
		</div>
	</div>
</header>

{#if menuOpen}
	<div transition:slide class="fixed inset-0 z-40 bg-brown-600/99">
		<nav class="flex flex-col items-start gap-y-4 px-2 pt-18.5 pb-8">
			<Button
				href={localizeHref('/')}
				label={m.home()}
				size="large"
				wrapperClass="w-full"
				class={[page.route.id === '/(content)' && 'active']}
			/>

			<Button
				href={localizeHref('/activities')}
				label={m.activities()}
				size="large"
				wrapperClass="w-full"
				class={[page.route.id === '/(content)/activities' && 'active']}
			/>

			<Button
				href={localizeHref('/teams')}
				label={m.teams()}
				size="large"
				wrapperClass="w-full"
				class={[page.route.id === '/(content)/teams' && 'active']}
			/>
		</nav>
	</div>
{/if}
