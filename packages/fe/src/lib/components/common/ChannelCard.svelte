<script lang="ts">
	import clsx from 'clsx';
	import type { Channel } from '$lib/types';
	import SubscribeButton from './SubscribeButton.svelte';

	export let channel: Channel;
	export let small: boolean = false;
</script>

<div class="flex items-center">
	<img src={channel.owner.image} class={clsx('rounded-full', { 'w-[2rem]': small, 'w-[7rem]': !small })} alt="" />
	<div class={clsx('flex justify-end gap-6', { grow: !small })}>
		<div class="hidden grow ps-5 sm:block">
			<h1 class="text-lg font-medium">{channel.owner.username}</h1>
			<p class="mb-1 text-xs text-gray-600">{channel.subs} subscribers</p>
			<p class="text-xs text-gray-600" class:hidden={small}>Welcome to my channel</p>
		</div>
		<div class="py-3">
			<SubscribeButton {channel} />
		</div>
	</div>
</div>
