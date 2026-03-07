<script lang="ts">
	import Login from '$lib/components/Auth/Login.svelte'
	import Profile from '$lib/components/Auth/Profile.svelte'
	import Register from '$lib/components/Auth/Register.svelte'
	import Card from '$lib/components/Card.svelte'

	let { data, form } = $props()

	let mode: 'signIn' | 'signUp' = $state('signIn')
</script>

<div class="mx-auto max-w-sm space-y-4 p-6">
	{#if data.user}
		<Profile user={data.user} accounts={data.accounts} />
	{:else}
		<Card title={mode === 'signIn' ? 'Sign In' : 'Create Account'}>
			<div class="space-y-4 p-2">
				{#if form?.message}
					<p class="bg-red-50 text-red-700 rounded px-3 py-2 text-sm">{form.message}</p>
				{/if}

				{#if mode === 'signIn'}
					<Login onSignUpClick={() => (mode = 'signUp')} />
				{:else}
					<Register onSignInClick={() => (mode = 'signIn')} />
				{/if}
			</div>
		</Card>
	{/if}
</div>
