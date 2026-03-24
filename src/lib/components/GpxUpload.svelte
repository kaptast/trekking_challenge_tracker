<script lang="ts">
	import { invalidate } from '$app/navigation'
	import { m } from '$lib/paraglide/messages'
	import {
		finalizeActivities,
		removeDraftActivity
	} from '../../routes/(content)/activities/activities.remote.js'
	import Button from './Button.svelte'
	import Distance from './Distance.svelte'
	import Duration from './Duration.svelte'

	type DraftActivity = {
		id: string
		name: string
		distance: number
		movingTime: number | null
		sportType: string
		startDate: string | null
	}

	let isDragging = $state(false)
	let errorMessage = $state<string | null>(null)
	let fileInput = $state<HTMLInputElement | null>(null)
	let isUploading = $state(false)
	let draftActivities = $state<DraftActivity[]>([])

	function validateFile(file: File): boolean {
		if (!file.name.toLowerCase().endsWith('.gpx')) {
			errorMessage = m.onlyGpxFilesAllowed()
			return false
		}
		errorMessage = null
		return true
	}

	function onDragOver(e: DragEvent) {
		e.preventDefault()
		isDragging = true
	}

	function onDragLeave() {
		isDragging = false
	}

	async function onDrop(e: DragEvent) {
		e.preventDefault()
		isDragging = false
		const file = e.dataTransfer?.files?.[0]
		if (file && validateFile(file)) {
			await uploadFile(file)
		}
	}

	function onInputChange(e: Event) {
		const file = (e.currentTarget as HTMLInputElement).files?.[0]
		if (file && validateFile(file)) {
			uploadFile(file)
		}
		if (fileInput) fileInput.value = ''
	}

	function openFilePicker() {
		fileInput?.click()
	}

	async function uploadFile(file: File) {
		isUploading = true
		errorMessage = null
		try {
			const body = new FormData()
			body.append('file', file)
			const res = await fetch('/api/activities/gpx', { method: 'POST', body })
			if (!res.ok) {
				const { message } = await res.json().catch(() => ({ message: res.statusText }))
				errorMessage = message
				return
			}
			const draft: DraftActivity = await res.json()
			draftActivities = [...draftActivities, draft]
		} catch (err) {
			errorMessage = err instanceof Error ? err.message : m.uploadFailed()
		} finally {
			isUploading = false
		}
	}

	async function handleRemove(id: string) {
		await removeDraftActivity({ id })
		draftActivities = draftActivities.filter((a) => a.id !== id)
	}

	async function handleSaveAll() {
		const ids = draftActivities.map((a) => a.id)
		await finalizeActivities({ ids })
		draftActivities = []
		await invalidate('activities')
	}
</script>

<div>
	<div
		class={[
			'drop-zone w-full cursor-pointer rounded-lg border-2 border-dashed px-8 py-4 text-center font-bold uppercase transition-colors',
			isDragging && 'drag-over'
		]}
		role="button"
		tabindex="0"
		aria-label={m.dropZoneAriaLabel()}
		ondragover={onDragOver}
		ondragleave={onDragLeave}
		ondrop={onDrop}
		onclick={openFilePicker}
		onkeydown={(e) => e.key === 'Enter' && openFilePicker()}
	>
		<p class="text-xl">{m.dropYourQuestFile()}</p>
		<p class="text-xl">(.gpx)</p>

		{#if errorMessage}
			<p class="mt-3 text-sm text-brown-600">{errorMessage}</p>
		{/if}

		<div class="border-t-2 border-brown-300"></div>

		<input
			bind:this={fileInput}
			type="file"
			accept=".gpx"
			class="hidden"
			onchange={onInputChange}
		/>

		<div class="mt-2 flex justify-center pb-2">
			<Button
				label={isUploading ? '…' : m.upload()}
				onclick={openFilePicker}
				disabled={isUploading}
			/>
		</div>
	</div>

	{#if draftActivities.length > 0}
		<div class="w-full p-2">
			<div class="py-2 text-xs font-semibold tracking-wider text-brown-600 uppercase">
				{m.pendingUploads()}
			</div>
			<div>
				{#each draftActivities as draft (draft.id)}
					<div
						class="text-brown-800 flex w-full items-center justify-between border-b-2 border-solid border-brown-300 py-2 font-bold last:border-b-0"
					>
						<div>
							<Distance value={draft.distance} />
						</div>

						{#if draft.movingTime}
							<div>
								<Duration value={draft.movingTime} />
							</div>
						{/if}
						<div>{draft.sportType}</div>

						{#if draft.startDate}
							<div>
								{new Date(draft.startDate).toLocaleDateString()}
							</div>
						{/if}

						<button
							class="cursor-pointer text-brown-600 transition-colors hover:text-brown-900"
							onclick={() => handleRemove(draft.id)}
							aria-label={m.removeItem({ name: draft.name })}
						>
							✕
						</button>
					</div>
				{/each}
			</div>
			<div class="mt-3 flex justify-end">
				<Button label={m.saveAll()} onclick={handleSaveAll} />
			</div>
		</div>
	{/if}
</div>

<style>
	.drop-zone:hover,
	.drag-over {
		background-color: color-mix(in srgb, var(--color-blue-dark) 95%, var(--color-sand) 5%);
	}
</style>
