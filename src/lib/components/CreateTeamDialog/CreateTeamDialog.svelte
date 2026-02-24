<script lang="ts">
	import { m } from '$lib/paraglide/messages.js'
	import { createTeamDialogState } from './createTeamDialogState.svelte'

	type Props = {
		onCreateTeam: (name: string) => Promise<void>
	}

	let { onCreateTeam }: Props = $props()

	let teamName = $state('')
</script>

<dialog id="basicmodal" title={m.createTeam()} open={createTeamDialogState.open}>
	<input
		value={teamName}
		oninput={(e: Event) => (teamName = (e.target as HTMLInputElement).value)}
		placeholder={m.teamName()}
		required
	/>
</dialog>
