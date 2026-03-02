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

<div class="bg-sand p-1 pb-0">
	<div class="chipped-corners bg-black p-0.5">
		<div class="chipped-corners bg-sand p-1">
			<div class="chipped-corners bg-black p-0.5">
				<div class="chipped-corners bg-blue-dark">
					<header
						class="mx-auto flex max-w-7xl items-center gap-x-4 px-4 font-bold text-sand-light"
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
								<span class="grid size-10 place-items-center border-x-2 border-black bg-[#2E3440]">
									<img
										src={user?.image || '/avatar.png'}
										alt={user.name}
										class="size-11/12 object-cover"
									/>
								</span>
								{user.name}
							</a>
						{:else}
							<Button href="/auth" label="Sign in" class="ml-auto" />
						{/if}
					</header>
				</div>
			</div>
		</div>
	</div>
</div>
