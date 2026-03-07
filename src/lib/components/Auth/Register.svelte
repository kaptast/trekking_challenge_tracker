<script lang="ts">
	import { enhance } from '$app/forms'
	import { m } from '$lib/paraglide/messages'
	import Button from '$lib/components/Button.svelte'

	type Props = {
		onSignInClick: () => void
	}

	let { onSignInClick }: Props = $props()
</script>

<form method="POST" action="?/signUp" use:enhance class="space-y-3">
	<div>
		<label class="text-sm font-semibold tracking-wider text-brown-500 uppercase" for="name">
			{m.name()}
		</label>
		<input
			id="name"
			name="name"
			type="text"
			required
			autocomplete="name"
			class="chipped-corners block w-full bg-brown-300 px-4 py-2 text-brown-500 focus:outline-none"
		/>
	</div>

	<div>
		<label class="text-sm font-semibold tracking-wider text-brown-500 uppercase" for="email">
			{m.email()}
		</label>
		<input
			id="email"
			name="email"
			type="email"
			required
			autocomplete="email"
			class="chipped-corners block w-full bg-brown-300 px-4 py-2 text-brown-500 focus:outline-none"
		/>
	</div>

	<div>
		<label class="text-sm font-semibold tracking-wider text-brown-500 uppercase" for="password">
			{m.password()}
		</label>
		<input
			id="password"
			name="password"
			type="password"
			required
			autocomplete="new-password"
			class="chipped-corners block w-full bg-brown-300 px-4 py-2 text-brown-500 focus:outline-none"
		/>
	</div>

	<Button label={m.createAccount()} type="submit" class="w-full" />
</form>

<p class="text-center text-sm text-brown-500">
	{m.alreadyHaveAnAccount()}

	<button
		onclick={onSignInClick}
		class="cursor-pointer text-brown-800 underline hover:no-underline"
	>
		{m.login()}
	</button>
</p>
