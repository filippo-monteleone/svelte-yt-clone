<script lang="ts">
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';

	import ChannelHeader from '$lib/components/routes-component/ChannelHeader.svelte';
	import type { Channel } from '$lib/types';

	export let data: LayoutData;

	let channel: Channel = {
		owner: data.user,
		subs: data.subs,
		videos: data.videos,
	};

	let selectedView: string;

	$: selectedView = $page.url.pathname.includes('community') ? 'Community' : 'Home';
</script>

<div class="mx-auto w-5/6">
	<div class="flex flex-col gap-3 border-b-2 px-10">
		<ChannelHeader {channel} />
		<div class="text-md mt-4 flex gap-7 font-semibold text-gray-700">
			<a
				href="/channel/{data.user.id}"
				class="border-b-2 {selectedView === 'Home' ? 'border-black' : 'border-white'} hover:border-gray-500"
				class:text-black={selectedView === 'Home'}
				on:click={() => {
					selectedView = 'Home';
				}}>Home</a
			>
			<a
				href="/channel/{data.user.id}/community"
				class="border-b-2 {selectedView === 'Community'
					? 'border-black'
					: 'border-white'} hover:border-gray-500"
				class:text-black={selectedView === 'Community'}
				on:click={() => {
					selectedView = 'Community';
					console.log(selectedView);
				}}>Community</a
			>
		</div>
	</div>
	<div class="px-10">
		<slot />
	</div>
</div>
