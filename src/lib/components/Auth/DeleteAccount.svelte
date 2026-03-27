<script lang="ts">
	import { enhance } from '$app/forms'
	import { m } from '$lib/paraglide/messages'
	import Button from '$lib/components/Button.svelte'
	import Card from '$lib/components/Card.svelte'
</script>

<Card class="delete-account">
	<div class="grid place-items-center space-y-2 p-4 text-center">
		<h3 class="text-2xl font-semibold text-brown-800 uppercase">{m.deleteAccount()}</h3>
		<p class="text-sm text-brown-800">{m.deleteAccountWarning()}</p>
		<form
			method="POST"
			action="?/deleteAccount"
			use:enhance
			onsubmit={(e) => {
				if (!confirm(m.deleteAccountConfirm())) {
					e.preventDefault()
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
