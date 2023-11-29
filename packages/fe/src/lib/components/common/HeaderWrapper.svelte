<script lang="ts">
	import HeaderMobile from './HeaderMobile.svelte';
	import HeaderDesktop from './HeaderDesktop.svelte';
	// eslint-disable-next-line no-undef
	export let me: User;
	let innerWidth: number;

	$: component = innerWidth > 1024 ? HeaderDesktop : HeaderMobile;
</script>

<svelte:window bind:innerWidth />

<svelte:component this={component} {me} on:login />
