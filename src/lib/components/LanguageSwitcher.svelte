<script lang="ts">
	import { getLocale, setLocale, locales } from '$lib/paraglide/runtime'

	const currentLocale = $derived(getLocale())

	const icons = {
		hu: '🇭🇺',
		en: '🇬🇧'
	}
</script>

<div class="flex items-center gap-1">
	{#each locales as locale (locale)}
		<button
			disabled={currentLocale === locale}
			class="cursor-pointer text-xl disabled:cursor-auto"
			onclick={() => setLocale(locale)}
		>
			{icons[locale]}
		</button>
	{/each}
</div>
