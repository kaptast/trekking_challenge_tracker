<script lang="ts">
	import { enhance } from '$app/forms'
	let { children, data } = $props()
</script>

<header>
	{#if data.user}
		<dap-ds-avatar src={data.user.image} alt="User Avatar" size="md"></dap-ds-avatar>

		<form method="POST" action="/auth?/signOut" use:enhance>
			<dap-ds-button htmlType="submit">Sign out</dap-ds-button>
		</form>
	{:else}
		<form method="POST" action="/auth?/signInSocial" use:enhance>
			<input type="hidden" name="provider" value="strava" />
			<input type="hidden" name="callbackURL" value="/" />
			<dap-ds-button htmlType="submit">Sign in with Strava</dap-ds-button>
		</form>
	{/if}
</header>

{@render children()}
