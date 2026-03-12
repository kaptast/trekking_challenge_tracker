<script lang="ts">
	import { invalidate } from '$app/navigation'
	import { m } from '$lib/paraglide/messages'
	import {
		finalizeActivities,
		removeDraftActivity
	} from '../../routes/(content)/activities/activities.remote.js'
	import Button from './Button.svelte'
	import Card from './Card.svelte'
	import Distance from './Distance.svelte'
	import Duration from './Duration.svelte'

	type DraftActivity = {
		id: string
		name: string
		distance: number
		movingTime: number | null
		type: string
		startDate: string | null
	}

	let isDragging = $state(false)
	let selectedFile = $state<File | null>(null)
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

	function handleFileSelect(file: File) {
		if (validateFile(file)) {
			selectedFile = file
		} else {
			selectedFile = null
		}
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
		if (file) {
			handleFileSelect(file)
			if (validateFile(file)) {
				await uploadFile(file)
			}
		}
	}

	function onInputChange(e: Event) {
		const file = (e.currentTarget as HTMLInputElement).files?.[0]
		if (file) handleFileSelect(file)
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
			selectedFile = null
			if (fileInput) fileInput.value = ''
		} catch (err) {
			errorMessage = err instanceof Error ? err.message : 'Upload failed'
		} finally {
			isUploading = false
		}
	}

	async function handleUpload() {
		if (!selectedFile) return
		await uploadFile(selectedFile)
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

<Card>
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

		{#if selectedFile}
			<p class="mt-3 text-sm text-olive-500">{selectedFile.name}</p>
		{/if}

		{#if errorMessage}
			<p class="mt-3 text-sm text-gold-600">{errorMessage}</p>
		{/if}

		<div class="my-2 border-b border-dashed border-black"></div>

		<input
			bind:this={fileInput}
			type="file"
			accept=".gpx"
			class="hidden"
			onchange={onInputChange}
		/>

		<div class="mt-2 flex justify-center">
			<Button
				label={isUploading ? '…' : m.upload()}
				onclick={handleUpload}
				disabled={!selectedFile || isUploading}
			/>
		</div>
	</div>

	{#if draftActivities.length > 0}
		<div class="mt-2 border-t border-brown-200 px-4 pb-2">
			<div class="py-2 text-xs font-semibold tracking-wider text-brown-500 uppercase">
				Pending uploads
			</div>
			{#each draftActivities as draft (draft.id)}
				<div class="flex items-center gap-3 border-b border-brown-100 py-2 last:border-none">
					<div class="min-w-0 flex-1 truncate font-semibold text-brown-800">{draft.name}</div>
					<div class="shrink-0 text-sm text-brown-600">
						<Distance value={draft.distance} />
					</div>
					{#if draft.movingTime}
						<div class="shrink-0 text-sm text-brown-600">
							<Duration value={draft.movingTime} />
						</div>
					{/if}
					<div class="shrink-0 text-xs text-brown-500">{draft.type}</div>
					{#if draft.startDate}
						<div class="shrink-0 text-xs text-brown-400">
							{new Date(draft.startDate).toLocaleDateString()}
						</div>
					{/if}
					<button
						class="hover:text-brown-700 shrink-0 text-xs text-brown-400"
						onclick={() => handleRemove(draft.id)}
						aria-label="Remove {draft.name}"
					>
						✕
					</button>
				</div>
			{/each}
			<div class="mt-3 flex justify-end">
				<Button label="Save all" onclick={handleSaveAll} />
			</div>
		</div>
	{/if}
</Card>

<style>
	.drop-zone:hover,
	.drag-over {
		background-color: color-mix(in srgb, var(--color-blue-dark) 95%, var(--color-sand) 5%);
	}
</style>
