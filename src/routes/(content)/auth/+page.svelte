<script lang="ts">
	import { enhance } from '$app/forms'
	import Button from '$lib/components/Button.svelte'
	import Card from '$lib/components/Card.svelte'

	let { data, form } = $props()

	let mode: 'signIn' | 'signUp' = $state('signIn')

	const stravaAccount = $derived(data.accounts.find((acc) => acc.providerId === 'strava'))
</script>

<div class="mx-auto max-w-sm space-y-4 p-6">
	{#if data.user}
		<!-- Logged-in: account management -->
		<Card title="Account">
			<div class="space-y-4 p-2">
				<p class="text-sm text-stone-600">Signed in as <strong>{data.user.name}</strong></p>
				<p class="text-stone-500 text-sm">{data.user.email}</p>

				<hr class="border-stone-200" />

				<div class="space-y-2">
					{#if stravaAccount}
						{#if stravaAccount.providerId === 'strava'}
							<p class="text-sm font-medium">Strava Connection</p>
							<p class="text-green-700 text-sm">Connected as {stravaAccount.accountId}</p>
							<form method="POST" action="?/unlinkStrava" use:enhance>
								<Button
									label="Disconnect Strava"
									type="submit"
									class="bg-red-50 text-red-700 w-full"
								/>
							</form>
						{/if}
					{:else}
						<p class="text-stone-500 text-sm">Not connected</p>
						<form method="POST" action="?/linkStrava" use:enhance>
							<Button
								label="Connect Strava"
								type="submit"
								class="bg-orange-50 text-orange-700 w-full"
							/>
						</form>
					{/if}
				</div>

				<hr class="border-stone-200" />

				<form method="POST" action="?/signOut" use:enhance>
					<Button label="Sign out" type="submit" class="w-full" />
				</form>
			</div>
		</Card>
	{:else}
		<!-- Not logged in: sign in / sign up -->
		<Card title={mode === 'signIn' ? 'Sign In' : 'Create Account'}>
			<div class="space-y-4 p-2">
				{#if form?.message}
					<p class="bg-red-50 text-red-700 rounded px-3 py-2 text-sm">{form.message}</p>
				{/if}

				{#if mode === 'signIn'}
					<form method="POST" action="?/signIn" use:enhance class="space-y-3">
						<div>
							<label class="mb-1 block text-sm font-medium" for="email">Email</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								autocomplete="email"
								class="focus:border-stone-500 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none"
							/>
						</div>
						<div>
							<label class="mb-1 block text-sm font-medium" for="password">Password</label>
							<input
								id="password"
								name="password"
								type="password"
								required
								autocomplete="current-password"
								class="focus:border-stone-500 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none"
							/>
						</div>
						<Button label="Sign in" type="submit" class="w-full" />
					</form>

					<p class="text-stone-500 text-center text-sm">
						No account yet?
						<button
							onclick={() => (mode = 'signUp')}
							class="text-stone-800 underline hover:no-underline"
						>
							Create one
						</button>
					</p>
				{:else}
					<form method="POST" action="?/signUp" use:enhance class="space-y-3">
						<div>
							<label class="mb-1 block text-sm font-medium" for="name">Name</label>
							<input
								id="name"
								name="name"
								type="text"
								required
								autocomplete="name"
								class="focus:border-stone-500 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none"
							/>
						</div>
						<div>
							<label class="mb-1 block text-sm font-medium" for="email">Email</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								autocomplete="email"
								class="focus:border-stone-500 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none"
							/>
						</div>
						<div>
							<label class="mb-1 block text-sm font-medium" for="password">Password</label>
							<input
								id="password"
								name="password"
								type="password"
								required
								autocomplete="new-password"
								class="focus:border-stone-500 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none"
							/>
						</div>
						<Button label="Create account" type="submit" class="w-full" />
					</form>

					<p class="text-stone-500 text-center text-sm">
						Already have an account?
						<button
							onclick={() => (mode = 'signIn')}
							class="text-stone-800 underline hover:no-underline"
						>
							Sign in
						</button>
					</p>
				{/if}
			</div>
		</Card>
	{/if}
</div>
