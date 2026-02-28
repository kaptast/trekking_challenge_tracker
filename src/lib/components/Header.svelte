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

<header class="bg-sand p-1 pb-0">
	<div class="chipped-corners bg-black p-0.5">
		<div class="chipped-corners bg-sand p-1">
			<div class="chipped-corners bg-black p-0.5">
				<div
					class="chipped-corners flex items-center gap-x-4 bg-blue-dark p-1 font-bold text-sand-light"
				>
					<a href="/" class=""> LOGO </a>

					<nav class="flex items-center gap-3 text-lg uppercase">
						<a href="/"> <span class="text-xl">[</span> Home <span class="text-xl">]</span></a>
						<a href="/activities">
							<span class="text-xl">[</span> Activities <span class="text-xl">]</span></a
						>
						<a href="/teams">
							<span class="text-xl">[</span> Teams <span class="text-xl">]</span></a
						>
					</nav>

					{#if user}
						<a href="/auth" class="ml-auto flex items-center gap-x-1">
							<span class="size-10 border-x-2 border-black">
								<img src={user?.image} alt={user.name} />
							</span>
							{user.name}
						</a>
					{:else}
						<Button href="/auth" label="Sign in" class="ml-auto" />
					{/if}
				</div>
			</div>
		</div>
	</div>
</header>
