<script lang="ts">
	import Login from '$lib/components/Auth/Login.svelte'
	import Profile from '$lib/components/Auth/Profile.svelte'
	import Register from '$lib/components/Auth/Register.svelte'
	import Card from '$lib/components/Card.svelte'

	let { data, form } = $props()

	let mode: 'signIn' | 'signUp' = $state('signIn')
</script>

{#if data.user}
	<Profile
		user={data.user}
		avatarSeed={data.avatarSeed}
		accounts={data.accounts}
		activities={data.activities}
		latestActivity={data.latestActivity}
		stats={data.stats}
	/>
{:else}
	<Card class="mx-auto w-fit">
		<div class="space-y-4 p-2">
			{#if form?.message}
				<p class="text-sm">{form.message}</p>
			{/if}

			{#if mode === 'signIn'}
				<Login onSignUpClick={() => (mode = 'signUp')} />
			{:else}
				<Register onSignInClick={() => (mode = 'signIn')} />
			{/if}
		</div>
	</Card>
{/if}
