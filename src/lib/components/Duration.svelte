<script lang="ts">
	type Props = {
		value: number
	}

	let { value }: Props = $props()

	const formattedDuration = $derived.by(() => {
		try {
			const intValue = Math.round(value) // Ensure the value is an integer

			// @ts-expect-error - Intl.DurationFormat is not yet supported in TypeScript's lib.dom.d.ts, but it is available in modern browsers
			return new Intl.DurationFormat('hu', { style: 'narrow' }).format({
				hours: Math.floor(intValue / 3600),
				minutes: Math.floor((intValue % 3600) / 60),
				seconds: intValue % 60
			})
		} catch (e) {
			// Fallback formatting if Intl.DurationFormat is not supported
			const hours = Math.floor(value / 3600)
			const minutes = Math.floor((value % 3600) / 60)
			const seconds = value % 60

			const parts = []
			if (hours > 0) parts.push(`${hours}h`)
			if (minutes > 0) parts.push(`${minutes}m`)
			if (seconds > 0) parts.push(`${seconds}s`)
			return parts.join(' ') || '0s'
		}
	})
</script>

{formattedDuration}
