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
			onclick={() => setLocale(locale)}
			class={[
				'chipped-corners grid cursor-pointer place-content-center border px-1.5 pt-2 pb-1 font-pixel text-lg leading-3 tracking-wider uppercase',
				currentLocale === locale
					? 'border-brown-900 bg-brown-800 text-gold-500 text-shadow-gold-800'
					: 'hover:bg-brown-700 border-brown-600 text-brown-100 text-shadow-black'
			]}
		>
			{icons[locale]}
		</button>
	{/each}
</div>
