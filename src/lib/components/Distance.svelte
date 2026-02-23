<script lang="ts">
	type Props = {
		value: number
	}

	let { value }: Props = $props()

	function formatDistance(meters: number): string {
		if (meters < 1000) {
			return `${meters.toFixed(0)} m`
		} else {
			return `${(meters / 1000).toFixed(2)} km`
		}
	}
</script>

{formatDistance(value)}
