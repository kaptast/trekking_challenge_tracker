<script lang="ts">
	import { enhance } from '$app/forms'
	import { m } from '$lib/paraglide/messages'
	import Button from '$lib/components/Button.svelte'

	type Props = {
		onSignUpClick: () => void
	}

	let { onSignUpClick }: Props = $props()
</script>

<form method="POST" action="?/signIn" use:enhance class="space-y-3">
	<div>
		<label class="text-sm font-semibold tracking-wider text-brown-600 uppercase" for="email">
			{m.email()}
		</label>
		<input
			id="email"
			name="email"
			type="email"
			required
			autocomplete="email"
			class="chipped-corners block w-full bg-brown-300 px-4 py-2 text-brown-600 focus:outline-none"
		/>
	</div>

	<div>
		<label class="text-sm font-semibold tracking-wider text-brown-600 uppercase" for="password">
			{m.password()}
		</label>
		<input
			id="password"
			name="password"
			type="password"
			required
			autocomplete="current-password"
			class="chipped-corners block w-full bg-brown-300 px-4 py-2 text-brown-600 focus:outline-none"
		/>
	</div>

	<Button label={m.login()} type="submit" wrapperClass="w-full" />
</form>

<p class="text-stone-500 text-center text-sm">
	{m.noAccount()}
	<button onclick={onSignUpClick} class="text-stone-800 underline hover:no-underline">
		{m.createAccount()}
	</button>
</p>
