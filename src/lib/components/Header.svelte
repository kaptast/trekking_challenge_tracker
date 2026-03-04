<script lang="ts">
	import { page } from '$app/state'
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

{#snippet link(href: string, label: string)}
	{@const active = page.url.pathname === href}
	<a
		{href}
		class={[
			'chipped-corners px-2 py-0.5 font-pixel uppercase',
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
		<div class="mx-auto flex max-w-7xl items-center gap-x-4 px-4 font-bold text-brown-100">
			<nav class="flex items-center gap-3">
				{@render link('/', 'Home')}
				{@render link('/activities', 'Activities')}
				{@render link('/teams', 'Teams')}
			</nav>

			{#if user}
				<a href="/auth" class="ml-auto flex items-center gap-x-1">
					<span class="grid size-10 place-items-center border-x-2 border-black bg-[#2E3440]">
						<img
							src={user?.image || '/avatar.png'}
							alt={user.name}
							class="size-11/12 object-cover"
						/>
					</span>
					{user.name}
				</a>
			{:else}
				<Button href="/auth" label="Sign in" class="ml-auto" />
			{/if}
		</div>
	</div>
</header>
