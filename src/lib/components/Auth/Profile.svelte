<script lang="ts">
	import Card from '$lib/components/Card.svelte'
	import type { User, Account } from 'better-auth'
	import AccountComponent from './Account.svelte'
	import Strava from './Strava.svelte'
	import Activities from './Activities.svelte'
	import type { Activity } from '$lib/types'
	import LatestActivity from './LatestActivity.svelte'

	type Props = {
		user: User
		accounts: Promise<Array<Account>> | never[]
		activities: Promise<Array<Activity>> | never[]
		latestActivity: Promise<Array<Activity>> | null
	}

	let { user, accounts, activities, latestActivity }: Props = $props()
</script>

<div class="profile-grid grid gap-4">
	<AccountComponent {user} />

	{#await accounts then account}
		<Strava accounts={account} />
	{/await}

	<Card class="stats"></Card>

	{#await activities then acts}
		<Activities activities={acts} />
	{/await}

	{#await latestActivity then acts}
		{@const latest = acts ? acts[0] : null}
		<LatestActivity activity={latest} />
	{/await}
</div>

<style>
	.profile-grid {
		grid-template-areas:
			'account stats stats'
			'strava stats stats'
			'activities activities latest-activity';
	}

	.profile-grid :global(.stats) {
		grid-area: stats;
	}
</style>
