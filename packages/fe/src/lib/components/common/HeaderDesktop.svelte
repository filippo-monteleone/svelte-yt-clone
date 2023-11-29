<script lang="ts">
	import SearchBar from './SearchBar.svelte';
	import type { User } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	export let me: User;
	const dispatch = createEventDispatcher();
</script>

<header class="sticky left-0 top-0 z-10 flex h-[4rem] items-center justify-between border-b-2 bg-white px-4 py-2">
	<div class="flex shrink-0 items-center gap-4">
		<img src="/ytLogo.svg" alt="" />
	</div>
	<SearchBar />
	<div class="flex gap-2">
		<img src="/createIcon.svg" class="rounded-full p-3 hover:bg-gray-200" alt="" />
		<img src="/notIcon.svg" class="rounded-full p-3 hover:bg-gray-200" alt="" />
		<button
			class="flex items-center rounded-full {me.image.includes('signInIcon')
				? 'border hover:bg-blue-200'
				: 'hover:bg-gray-200'}"
			class:border-slate-200={me.image.includes('signInIcon')}
			on:click={() => {
				dispatch('login');
			}}
		>
			<img src={me.image} class="mx-2 w-[2rem]" alt="" />
			<p class="me-5 text-sm font-semibold text-blue-600" class:hidden={!me.image.includes('signInIcon')}>
				Sign In
			</p>
		</button>
	</div>
</header>
