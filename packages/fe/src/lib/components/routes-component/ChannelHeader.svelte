<script lang="ts">
	import type { Channel } from '$lib/types';
	import SubscribeButton from '../common/SubscribeButton.svelte';

	export let channel: Channel;
</script>

<div class="flex gap-5 text-sm">
	<img src={channel.owner.image} alt="" class="h-[9rem] rounded-full" />
	<div class="flex flex-col items-start gap-2 text-gray-700">
		<h1 class="text-3xl font-bold capitalize text-black">{channel.owner.username}</h1>
		<div>
			<span>@{channel.owner.username} ‧</span>
			<span>{channel.subs} subscriber ‧</span>
			{#if channel.videos == 1}
				<span>{channel.videos} video</span>
			{:else}
				<span>{channel.videos} videos</span>
			{/if}
		</div>
		<a href="/" class="flex text-center">
			<span>More about this channel</span>
			<img src="/arrowRight.svg" alt="" />
		</a>
		<SubscribeButton {channel} />
	</div>
</div>
