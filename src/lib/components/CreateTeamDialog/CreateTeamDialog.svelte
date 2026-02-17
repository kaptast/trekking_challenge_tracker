<script lang="ts">
	import { m } from '$lib/paraglide/messages.js'
	import { createTeamDialogState } from './createTeamDialogState.svelte'

	type Props = {
		onCreateTeam: (name: string) => Promise<void>
	}

	let { onCreateTeam }: Props = $props()

	let teamName = $state('')
</script>

<dap-ds-modal
	id="basicmodal"
	title={m.createTeam()}
	{...createTeamDialogState.open ? { open: true } : {}}
	ondds-closed={() => {
		createTeamDialogState.open = false
		teamName = ''
	}}
	ondds-ok={() => {
		onCreateTeam(teamName)
		teamName = ''
	}}
>
	<dap-ds-stack direction="column">
		<dap-ds-input
			value={teamName}
			ondds-input={(e: CustomEvent<{ value: string }>) => (teamName = e.detail.value)}
			label={m.teamName()}
			required
		></dap-ds-input>
	</dap-ds-stack>
</dap-ds-modal>
