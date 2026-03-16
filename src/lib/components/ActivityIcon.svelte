<script lang="ts">
	import type { SportType } from '$lib/types'
	import type { Snippet } from 'svelte'

	type Props = {
		type: SportType
	}

	let { type }: Props = $props()

	type ActivityGroup =
		| 'Snow'
		| 'Board'
		| 'Bike'
		| 'Run'
		| 'Walk'
		| 'Swim'
		| 'Paddle'
		| 'Gym'
		| 'Racket'
		| 'Ball'

	export const activityGroup: Record<SportType, ActivityGroup> = {
		AlpineSki: 'Snow',
		BackcountrySki: 'Snow',
		NordicSki: 'Snow',
		RollerSki: 'Snow',
		Snowboard: 'Snow',
		Snowshoe: 'Walk',

		IceSkate: 'Board',
		InlineSkate: 'Board',
		Skateboard: 'Board',

		Ride: 'Bike',
		GravelRide: 'Bike',
		MountainBikeRide: 'Bike',
		EBikeRide: 'Bike',
		EMountainBikeRide: 'Bike',
		VirtualRide: 'Bike',
		Velomobile: 'Bike',
		Handcycle: 'Bike',

		Run: 'Run',
		TrailRun: 'Run',
		VirtualRun: 'Run',

		Walk: 'Walk',
		Hike: 'Walk',

		Swim: 'Swim',

		Rowing: 'Paddle',
		VirtualRow: 'Paddle',
		Canoeing: 'Paddle',
		Kayaking: 'Paddle',
		StandUpPaddling: 'Paddle',

		Surfing: 'Board',
		Kitesurf: 'Board',

		Windsurf: 'Board',
		Sail: 'Board',

		RockClimbing: 'Gym',

		Tennis: 'Racket',
		TableTennis: 'Racket',
		Squash: 'Racket',
		Racquetball: 'Racket',
		Badminton: 'Racket',
		Pickleball: 'Racket',

		Soccer: 'Ball',
		Golf: 'Ball',

		Crossfit: 'Gym',
		WeightTraining: 'Gym',
		HighIntensityIntervalTraining: 'Gym',
		Workout: 'Gym',
		Elliptical: 'Gym',
		StairStepper: 'Gym',
		Pilates: 'Gym',
		Yoga: 'Gym',

		Wheelchair: 'Walk'
	} as const

	export const groupIcon: Record<ActivityGroup, Snippet> = {
		Bike: BikeIcon,
		Run: RunIcon,
		Walk: WalkIcon,
		Swim: SwimIcon,
		Paddle: PaddleIcon,
		Snow: SkiIcon,
		Board: BoardIcon,
		Ball: BallIcon,
		Racket: RacketIcon,
		Gym: GymIcon
	}
</script>

{#snippet BikeIcon()}
	<svg viewBox="0 0 16 16" shape-rendering="crispEdges" fill="currentColor">
		<rect x="2" y="11" width="3" height="3" />
		<rect x="11" y="11" width="3" height="3" />
		<rect x="5" y="9" width="3" height="1" />
		<rect x="7" y="7" width="1" height="2" />
		<rect x="8" y="9" width="3" height="1" />
	</svg>
{/snippet}

{#snippet RunIcon()}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
		<circle cx="15" cy="4" r="2" />
		<path d="M13 8l-3 4 3 2 3-2M10 12l-3 6M13 14l2 6" />
	</svg>
{/snippet}

{#snippet WalkIcon()}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
		<circle cx="12" cy="4" r="2" />
		<path d="M10 8l2 3 2-1M12 11l-2 5M12 11l3 5" />
	</svg>
{/snippet}

{#snippet SwimIcon()}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
		<circle cx="7" cy="7" r="2" />
		<path d="M3 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
		<path d="M9 8l3 2 3-1" />
	</svg>
{/snippet}

{#snippet PaddleIcon()}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
		<path d="M2 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
		<path d="M12 3v12" />
		<path d="M10 3h4" />
	</svg>
{/snippet}

{#snippet SkiIcon()}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
		<path d="M6 3l6 18" />
		<path d="M12 3l6 18" />
	</svg>
{/snippet}

{#snippet BoardIcon()}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
		<rect x="3" y="10" width="18" height="4" rx="2" />
		<circle cx="7" cy="16" r="1" />
		<circle cx="17" cy="16" r="1" />
	</svg>
{/snippet}

{#snippet BallIcon()}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
		<circle cx="12" cy="12" r="8" />
		<path d="M4 12h16M12 4a16 16 0 000 16" />
	</svg>
{/snippet}

{#snippet RacketIcon()}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
		<ellipse cx="10" cy="10" rx="5" ry="6" />
		<path d="M13 14l5 5" />
	</svg>
{/snippet}

{#snippet GymIcon()}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
		<path d="M2 10h4v4H2zM18 10h4v4h-4z" />
		<path d="M6 12h12" />
	</svg>
{/snippet}

{@render groupIcon[activityGroup[type]]()}
