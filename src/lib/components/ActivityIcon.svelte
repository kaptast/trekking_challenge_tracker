<script lang="ts">
	import type { SportType } from '$lib/types'
	import { asset } from '$app/paths'

	type Props = {
		type: SportType
	}

	let { type }: Props = $props()

	type ActivityGroup =
		| 'Ball'
		| 'Bike'
		| 'Board'
		| 'Gym'
		| 'Paddle'
		| 'Racket'
		| 'Run'
		| 'Snow'
		| 'Swim'
		| 'Walk'

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
		cycling: 'Bike',

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

	export const groupIcon: Record<ActivityGroup, string> = {
		Bike: 'bike.png',
		Run: 'run.png',
		Walk: 'walk.png',
		Swim: 'swim.png',
		Paddle: 'paddle.png',
		Snow: 'ski.png',
		Board: 'board.png',
		Ball: 'ball.png',
		Racket: 'racket.png',
		Gym: 'gym.png'
	}
</script>

<img class="size-10" src={asset(`/sports/${groupIcon[activityGroup[type]]}`)} alt={type} />
