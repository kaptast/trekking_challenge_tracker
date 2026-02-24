<script lang="ts">
	import CreateTeamDialog from '$lib/components/CreateTeamDialog/CreateTeamDialog.svelte'
	import Header from '$lib/components/Header.svelte'
	import { createTeam } from './data.remote.js'

	let { children, data } = $props()
</script>

<Header user={data.user} />

<main class="mx-auto max-w-7xl">
	{@render children()}
</main>

<CreateTeamDialog
	onCreateTeam={async (name) => {
		await createTeam({ name })
	}}
/>
