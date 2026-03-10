<script lang="ts">
	import polyline from '@mapbox/polyline'

	type Props = {
		summaryPolyline: string
	}

	let { summaryPolyline }: Props = $props()

	const coordinates = $derived(polyline.decode(summaryPolyline))

	const bounds = $derived.by(() => {
		if (coordinates.length === 0) {
			return { minLat: 0, maxLat: 0, minLng: 0, maxLng: 0 }
		}

		let minLat = coordinates[0][0]
		let maxLat = coordinates[0][0]
		let minLng = coordinates[0][1]
		let maxLng = coordinates[0][1]

		for (const [lat, lng] of coordinates) {
			if (lat < minLat) minLat = lat
			if (lat > maxLat) maxLat = lat
			if (lng < minLng) minLng = lng
			if (lng > maxLng) maxLng = lng
		}

		return { minLat, maxLat, minLng, maxLng }
	})

	const svgPath = $derived.by(() => {
		if (coordinates.length === 0) return ''

		const padding = 10
		const width = 600
		const height = 400

		const latRange = bounds.maxLat - bounds.minLat || 1
		const lngRange = bounds.maxLng - bounds.minLng || 1

		const points = coordinates
			.map(([lat, lng]) => {
				// Convert lat/lng to SVG coordinates
				// Note: SVG y-axis is inverted (0 is at top)
				const x = ((lng - bounds.minLng) / lngRange) * (width - 2 * padding) + padding
				const y = ((bounds.maxLat - lat) / latRange) * (height - 2 * padding) + padding
				return `${x},${y}`
			})
			.join(' ')

		return points
	})
</script>

<svg width="60" height="40" viewBox="0 0 600 400">
	<polyline points={svgPath} fill="none" stroke="var(--color-brown-500)" stroke-width="15" />
</svg>
