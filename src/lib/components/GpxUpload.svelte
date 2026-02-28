<script lang="ts">
	import Button from './Button.svelte'

	let isDragging = $state(false)
	let selectedFile = $state<File | null>(null)
	let errorMessage = $state<string | null>(null)
	let fileInput = $state<HTMLInputElement | null>(null)

	function validateFile(file: File): boolean {
		if (!file.name.toLowerCase().endsWith('.gpx')) {
			errorMessage = 'Only .gpx files are allowed.'
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

<div class="chipped-corners bg-black p-0.5">
	<div class="chipped-corners bg-sand p-1">
		<div class="chipped-corners bg-blue-dark p-4">
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class={[
					'drop-zone cursor-pointer rounded-lg border-2 border-dashed border-sand px-8 py-4 text-center font-bold text-sand-light uppercase transition-colors',
					isDragging && 'drag-over'
				]}
				role="button"
				tabindex="0"
				aria-label="Drop zone for GPX files"
				ondragover={onDragOver}
				ondragleave={onDragLeave}
				ondrop={onDrop}
				onclick={openFilePicker}
				onkeydown={(e) => e.key === 'Enter' && openFilePicker()}
			>
				<p class="text-xl">DROP YOUR QUEST FILE</p>
				<p class="text-xl">(.gpx)</p>

				{#if selectedFile}
					<p class="mt-3 text-sm text-green">{selectedFile.name}</p>
				{/if}

				{#if errorMessage}
					<p class="mt-3 text-sm text-orange">{errorMessage}</p>
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
					<Button label="Feltöltés" onclick={handleUpload} disabled={!selectedFile} />
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.drop-zone:hover,
	.drag-over {
		background-color: color-mix(in srgb, var(--color-blue-dark) 95%, var(--color-sand) 5%);
	}
</style>
