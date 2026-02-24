<script lang="ts">
	import Button from '$lib/components/Button.svelte'
	import Card from '$lib/components/Card.svelte'
	import Divider from '$lib/components/Divider.svelte'
</script>

<div class="space-y-2 p-10">
	<Card title="Active Challenge">
		{#snippet icon()}
			<svg
				width="53"
				height="30"
				viewBox="0 0 53 30"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M0 30L53 29L42 7L39 16L27 0L16 18.5L11.5 14L0 30ZM34 20.5L24 10.5L28 8L31 14.25L34 20.5Z"
					fill="#6E7177"
				/>
			</svg>
		{/snippet}

		<div class="mx-auto w-4/5 space-y-2">
			<h4 class="text-xl font-medium">Spring Alpine Quest</h4>
			<p class="text-lg">Group: Mountain Goats</p>

			<div class="mx-auto w-fit">
				<Button label="View details" href="/challenges/1" />
			</div>
		</div>

		{#snippet bottomRightDecoration()}
			<svg
				width="55"
				height="34"
				viewBox="0 0 55 34"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M18.5223 10.9303L1.02232 33.4303H54.0223V19.4303L50.5223 21.9303L40.0223 0.93029L25.5223 19.4303L18.5223 10.9303Z"
					fill="#C5C7CB"
				/>
			</svg>
		{/snippet}
	</Card>

	<div class="flex gap-2">
		<Card title="My Group">
			{#snippet icon()}
				<svg
					width="30"
					height="23"
					viewBox="0 0 30 23"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M13.9999 7C13.9999 9.76142 11.7614 12 8.99994 12C6.23852 12 3.99994 9.76142 3.99994 7C3.99994 4.23857 6.23852 2 8.99994 2C11.7614 2 13.9999 4.23857 13.9999 7Z"
						fill="#6E7278"
					/>
					<path
						d="M26.9999 5C26.9999 7.76142 24.7614 10 21.9999 10C19.2385 10 16.9999 7.76142 16.9999 5C16.9999 2.23858 19.2385 0 21.9999 0C24.7614 0 26.9999 2.23858 26.9999 5Z"
						fill="#6E7278"
					/>
					<path
						d="M0 23H30V17L29 14L26 12L22 11L18 12L15.5 14L14.5 17H13.5L13 15.5L12 14L10.5 13H8.5L6.5 13.5L4.5 14L2 15.5L0.5 18.5L0 23Z"
						fill="#6E7278"
					/>
				</svg>
			{/snippet}

			<h4 class="font-cursive text-xl">Mountain Goats</h4>

			<Divider />

			<div class="mt-2 grid grid-rows-2 place-content-center gap-2">
				<Button label="Create Group" href="/groups/create" />
				<Button label="Join Group" href="/groups" />
			</div>

			{#snippet bottomLeftDecoration()}
				<svg
					width="69"
					height="33"
					viewBox="0 0 69 33"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M6.5 0.699783L0.5 5.69978V31.6998H67L50 21.6998L41.5 26.1998L27.5 10.1998L21.5 18.1998L6.5 0.699783Z"
						fill="#C5C7CB"
					/>
				</svg>
			{/snippet}

			{#snippet bottomRightDecoration()}
				<svg
					width="50"
					height="32"
					viewBox="0 0 50 32"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M18.8505 15.8657L1.35052 31.3657L49.3505 30.3657V16.8657L34.3505 0.865662L25.8505 17.8657L18.8505 15.8657Z"
						fill="#C5C7CB"
					/>
				</svg>
			{/snippet}
		</Card>

		<Card title="My Activity Summary">
			{#snippet icon()}
				🥇
			{/snippet}

			<div>
				<span>This Week: 42 km</span>
				<Divider />
				<span>Elevation: 1,250 m</span>
				<Divider />
				<span>Activities: 3</span>
				<Divider />
			</div>

			<div class="mt-2 grid grid-rows-2 place-content-center gap-2">
				<Button label="Sync with Strava" href="/activities/sync" />
				<Button label="Import GPX" href="/activities/import" />
			</div>

			{#snippet bottomRightDecoration()}
				<svg
					width="30"
					height="23"
					viewBox="0 0 30 23"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M0.362076 22.162L10.3621 11.662L15.3621 16.162L26.8621 0.661972L29.3621 2.16197V22.162H0.862076"
						fill="#C5C7CB"
					/>
				</svg>
			{/snippet}
		</Card>
	</div>

	<Card title="Recent Group Activities">
		{#snippet icon()}
			🥇
		{/snippet}

		<ul>
			<li>
				<strong>Alice</strong> hiked 15 km in the Alps. (2h ago)
				<Divider />
			</li>
			<li>
				<strong>Bob</strong> biked 30 km in the Rockies. (5h ago)
				<Divider />
			</li>
			<li>
				<strong>Charlie</strong> ran 10 km in the city. (1d ago)
				<Divider />
			</li>
		</ul>

		<div class="mt-2 grid place-content-center">
			<Button label="View All Activities" href="/activities" />
		</div>

		{#snippet bottomRightDecoration()}
			<svg
				width="66"
				height="38"
				viewBox="0 0 66 38"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M21.2441 12.9319C14.4107 20.9319 0.644064 36.9319 0.244064 36.9319H65.2441L64.7441 11.4319L54.7441 22.9319L43.7441 0.931885L27.7441 21.4319L21.2441 12.9319Z"
					fill="#C5C7CB"
				/>
			</svg>
		{/snippet}
	</Card>
</div>
