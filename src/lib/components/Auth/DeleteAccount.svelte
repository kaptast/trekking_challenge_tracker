<script lang="ts">
	import { enhance } from '$app/forms'
	import { m } from '$lib/paraglide/messages'
	import Button from '$lib/components/Button.svelte'
	import Card from '$lib/components/Card.svelte'
</script>

<Card class="delete-account">
	<div class="grid place-items-center space-y-2 p-4 text-center">
		<h3 class="text-brown-800 text-2xl font-semibold uppercase">{m.deleteAccount()}</h3>
		<p class="text-brown-800 text-sm">{m.deleteAccountWarning()}</p>
		<form
			method="POST"
			action="?/deleteAccount"
			use:enhance={({ cancel }) => {
				if (!confirm(m.deleteAccountConfirm())) {
					cancel()
				}
			}}
		>
			<Button label={m.deleteAccount()} type="submit" variant="delete" />
		</form>
	</div>
</Card>

<style>
	:global(.delete-account) {
		grid-area: delete-account;
	}
</style>
