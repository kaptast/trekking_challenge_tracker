<script lang="ts">
	import { m } from '$lib/paraglide/messages'
	import Button from './Button.svelte'
	import Card from './Card.svelte'

	let isDragging = $state(false)
	let selectedFile = $state<File | null>(null)
	let errorMessage = $state<string | null>(null)
	let fileInput = $state<HTMLInputElement | null>(null)

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

	function onDragLeave(e: DragEvent) {
		isDragging = false
	}

	function onDrop(e: DragEvent) {
		e.preventDefault()
		isDragging = false
		const file = e.dataTransfer?.files?.[0]
		if (file) handleFileSelect(file)
	}

	function onInputChange(e: Event) {
		const file = (e.currentTarget as HTMLInputElement).files?.[0]
		if (file) handleFileSelect(file)
	}

	function openFilePicker() {
		fileInput?.click()
	}

	function handleUpload() {
		if (!selectedFile) return
		// TODO: implement actual upload logic
		console.log('Uploading', selectedFile.name)
	}
</script>

<Card>
	<div
		class={[
			'drop-zone cursor-pointer rounded-lg border-2 border-dashed px-8 py-4 text-center font-bold uppercase transition-colors',
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
			<Button label={m.upload()} onclick={handleUpload} disabled={!selectedFile} />
		</div>
	</div>
</Card>

<style>
	.drop-zone:hover,
	.drag-over {
		background-color: color-mix(in srgb, var(--color-blue-dark) 95%, var(--color-sand) 5%);
	}
</style>
