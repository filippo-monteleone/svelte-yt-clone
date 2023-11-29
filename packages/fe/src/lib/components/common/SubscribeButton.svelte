<script lang="ts">
	import { subs } from '$lib/stores';
	import type { Channel } from '$lib/types';

	export let channel: Channel;
</script>

{#if $subs.find((x) => x.owner.id === channel.owner.id)}
	<button
		class="rounded-full bg-gray-300 px-4 py-2 text-sm font-medium text-black"
		on:click={() => {
			$subs = $subs.filter((x) => x.owner.id !== channel.owner.id);
			console.log($subs);
		}}>Unsubscribe</button
	>
{:else}
	<button
		class="rounded-full bg-black px-4 py-2 text-sm font-medium text-white"
		on:click={() => {
			$subs = [...$subs, channel];

			console.log($subs);
		}}>Subscribe</button
	>
{/if}
