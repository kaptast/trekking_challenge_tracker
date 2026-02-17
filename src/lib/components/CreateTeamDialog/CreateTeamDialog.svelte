<script lang="ts">
	import { m } from '$lib/paraglide/messages.js'
	import { createTeamDialogState } from './createTeamDialogState.svelte'

	type Props = {
		onCreateTeam: (name: string, code: string) => Promise<void>
	}

	let { onCreateTeam }: Props = $props()

	let teamName = $state('')
	let teamCode = $state('')
</script>

<dap-ds-modal
	id="basicmodal"
	title={m.createTeam()}
	{...createTeamDialogState.open ? { open: true } : {}}
	ondds-closed={() => {
		createTeamDialogState.open = false
		teamName = ''
		teamCode = ''
	}}
	ondds-ok={() => {
		onCreateTeam(teamName, teamCode)
		teamName = ''
		teamCode = ''
	}}
>
	<dap-ds-stack direction="column">
		<dap-ds-input
			value={teamName}
			ondds-input={(e: CustomEvent<{ value: string }>) => (teamName = e.detail.value)}
			label={m.teamName()}
			required
		></dap-ds-input>

		<dap-ds-code-puncher
			value={teamCode}
			ondds-change={(e: CustomEvent<{ value: string }>) => (teamCode = e.detail.value)}
			label={m.teamCode()}
		>
			<dap-ds-code-puncher-slot></dap-ds-code-puncher-slot>
			<dap-ds-code-puncher-slot></dap-ds-code-puncher-slot>
			<dap-ds-code-puncher-slot></dap-ds-code-puncher-slot>
			<dap-ds-code-puncher-slot></dap-ds-code-puncher-slot>
			<dap-ds-code-puncher-slot></dap-ds-code-puncher-slot>
			<dap-ds-code-puncher-slot></dap-ds-code-puncher-slot>
		</dap-ds-code-puncher>
	</dap-ds-stack>
</dap-ds-modal>
