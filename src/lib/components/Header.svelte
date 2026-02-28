<script lang="ts">
	import Button from './Button.svelte'

	type Props = {
		user:
			| {
					name?: string | null | undefined
					image?: string | null | undefined
			  }
			| undefined
	}

	let { user }: Props = $props()
</script>

<header class="chipped-corners bg-sand p-1">
	<div class="chipped-corners bg-black p-0.5">
		<div class="chipped-corners flex items-center justify-between bg-blue p-1">
			<a href="/" class=""> LOGO </a>

			<nav class="flex items-center gap-3 text-sm">
				<a href="/activities"> Activities </a>
				<a href="/teams"> Teams </a>
			</nav>
			{#if user}
				<a href="/auth" class="size-10 rounded-full">
					<img src={user?.image} alt={user.name} />
				</a>
			{:else}
				<Button href="/auth" label="Sign in" />
			{/if}
		</div>
	</div>
</header>
