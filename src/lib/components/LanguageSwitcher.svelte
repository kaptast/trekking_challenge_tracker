<script lang="ts">
	import { getLocale, setLocale, locales } from '$lib/paraglide/runtime'

	const currentLocale = $derived(getLocale())
</script>

<div class="flex items-center gap-1">
	{#each locales as locale (locale)}
		<button
			onclick={() => setLocale(locale)}
			class={[
				'chipped-corners cursor-pointer border px-2 py-0.5 font-pixel text-sm tracking-wider uppercase',
				currentLocale === locale
					? 'border-brown-900 bg-brown-800 text-gold-500 text-shadow-gold-800'
					: 'hover:bg-brown-700 border-brown-600 text-brown-100 text-shadow-black'
			]}
		>
			{locale}
		</button>
	{/each}
</div>
