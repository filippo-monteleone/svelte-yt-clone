<script lang="ts">
	import SidebarDesktop from './SidebarDesktop.svelte';
	import SidebarMobile from './SidebarMobile.svelte';

	let innerWidth: number;
</script>

<svelte:window bind:innerWidth />

<svelte:component this={(innerWidth > 1024 && SidebarDesktop) || SidebarMobile} />
