<script lang="ts">
	import type { User, Account } from 'better-auth'
	import AccountComponent from './Account.svelte'
	import Strava from './Strava.svelte'
	import Activities from './Activities.svelte'
	import type { Activity, Stats } from '$lib/types'
	import LatestActivity from './LatestActivity.svelte'
	import UserStats from './UserStats.svelte'

	type Props = {
		user: User
		avatarSeed: string | null | undefined
		accounts: Promise<Array<Account>> | never[]
		activities: Promise<Array<Activity>> | never[]
		latestActivity: Promise<Array<Activity>> | null
		stats: Promise<Stats> | null
	}

	let { user, avatarSeed, accounts, activities, latestActivity, stats }: Props = $props()
</script>

<div class="profile-grid grid gap-4">
	<AccountComponent {user} {avatarSeed} />

	{#await accounts then account}
		<Strava accounts={account} />
	{/await}

	{#await stats then userStats}
		<UserStats stats={userStats} />
	{/await}

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
</style>
