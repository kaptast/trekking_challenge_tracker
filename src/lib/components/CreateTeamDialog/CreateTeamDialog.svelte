<script lang="ts">
	import { m } from '$lib/paraglide/messages.js'
	import Button from '$lib/components/Button.svelte'
	import { createTeam } from './team.remote.js'
	import Card from '../Card.svelte'

	let dialog = $state<HTMLDialogElement | null>(null)

	export function open() {
		dialog?.showModal()
	}

	function close() {
		dialog?.close()
		resetFields()
	}

	function resetFields() {
		createTeam.fields.name.set('')
	}
</script>

<dialog bind:this={dialog} onclose={resetFields} class="w-full max-w-md bg-transparent">
	<Card title={m.createTeam()}>
		<form
			{...createTeam.enhance(async ({ submit }) => {
				await submit()
				close()
			})}
			class="flex w-full flex-col gap-6 px-6 py-6"
		>
			<div class="flex flex-col gap-2">
				<label for="name" class="text-sm font-semibold tracking-wider text-brown-600 uppercase">
					{m.teamName()}
				</label>

				<div class="chipped-corners bg-brown-900 p-0.75">
					<input
						{...createTeam.fields.name.as('text')}
						class="chipped-corners block w-full bg-sand px-4 py-2 text-brown-600 focus:outline-none"
					/>
				</div>
			</div>

			<div class="flex justify-end gap-3">
				<Button type="button" variant="secondary" label={m.cancel()} onclick={close} />
				<Button type="submit" label={m.submit()} />
			</div>
		</form>
	</Card>
</dialog>

<style>
	dialog {
		margin: auto;
	}

	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.75);
		backdrop-filter: blur(2px);
	}
</style>
