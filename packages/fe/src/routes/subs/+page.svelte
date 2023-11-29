<script lang="ts">
	import ChannelCard from '$lib/components/common/ChannelCard.svelte';
	import type { Channel } from '$lib/types';

	import { subs } from '$lib/stores';

	let mySubs: Channel[] = [];

	subs.subscribe((value) => {
		if (mySubs.length === 0) mySubs = value;
		console.log(mySubs);
	});
</script>

<div class="flex flex-col items-center">
	<div class="flex w-full flex-col gap-5 lg:w-3/5">
		{#each mySubs as channel}
			<ChannelCard {channel} />
		{/each}
	</div>
</div>
