<script lang="ts">
	import { setLocale } from '$lib/i18n/i18n-svelte';
	import '../app.postcss';
	import type { LayoutData } from './$types';
	import { me } from '$lib/stores';
	import { showLoginStore } from '$lib/stores';

	export let data: LayoutData;

	import HeaderWrapper from '$lib/components/common/HeaderWrapper.svelte';
	import SidebarWrapper from '$lib/components/common/SidebarWrapper.svelte';
	import { scale } from 'svelte/transition';

	setLocale(data.locale);

	let showLogin: boolean = false;
	let innerWidth: number;

	showLoginStore.subscribe((value) => {
		showLogin = value;
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="fixed left-0 top-0 z-50 flex h-screen w-screen bg-slate-500/20"
	class:hidden={!showLogin}
	in:scale
	on:click|self={() => {
		showLogin = false;
		$showLoginStore = false;
	}}
>
	<div class="m-auto flex flex-col gap-5 rounded-xl bg-white p-10 shadow-xl">
		<div class="flex flex-col gap-2">
			<img class="m-auto w-[5rem]" src="googleIcon.svg" alt="" />
			<h1 class="text-center text-xl font-medium">Sign in</h1>
			<p class="text-md text-center">to use Youtube</p>
		</div>
		<form class="flex flex-col gap-5" method="POST">
			<input type="text" class="h-[3rem] w-[20rem] rounded-md border-2" name="username" />
			<div class="mt-7 flex justify-between gap-3">
				<button type="button" class="rounded-md px-3 py-2 font-medium text-blue-600 hover:bg-sky-100"
					>Create account</button
				>
				<button class="rounded-md bg-blue-600 px-5 py-2 font-medium text-white">Next</button>
			</div>
		</form>
	</div>
</div>

<svelte:window bind:innerWidth />

<div class="flex h-full w-full flex-col">
	<HeaderWrapper
		me={$me}
		on:login={() => {
			showLogin = true;
		}}
	/>

	<div class="flex grow overflow-auto pl-5 lg:pl-0">
		<SidebarWrapper />
		<div class="mt-3 w-full">
			<main class="w-full lg:pr-4">
				<slot />
			</main>
		</div>
	</div>
</div>

<style>
</style>
