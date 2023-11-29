<script lang="ts">
	import RecommendedVideoCard from '../common/RecommendedVideoCard.svelte';
	import { test } from '$lib/data';
	import { goto } from '$app/navigation';
	import { clsx } from 'clsx';

	export let currentVideo: number;
	export let videoList: number[] = [];

	let likedVideos = test.filter((x) => videoList.find((y) => x.id === y));

	let disableUp: boolean = videoList[videoList.findIndex((x) => x == currentVideo) - 1] === undefined;
	let disableDown: boolean = videoList[videoList.findIndex((x) => x == currentVideo) + 1] === undefined;
	let currentDrag: number;

	let listOfVideos = likedVideos;
</script>

<div class="mb-5 flex max-h-[25rem] flex-col overflow-clip rounded-xl border border-slate-300 lg:mb-0 lg:max-h-[39rem]">
	<div class="ms-5 bg-white">
		<h1 class="text-lg font-bold">Liked videos</h1>
		<div class="flex">
			<button
				class={clsx('rounded-full p-1', { 'hover:bg-slate-200': !disableUp })}
				on:click={() => {
					let nextVideo = videoList.findIndex((x) => x == currentVideo);
					if (videoList[nextVideo - 1] === undefined) {
						disableUp = true;
					} else {
						disableUp = false;
						goto('/video?v=' + videoList[nextVideo - 1] + '&list=LL');
					}
				}}
			>
				<img src="arrowUpIcon.svg" alt="" />
			</button>
			<button
				class={clsx('rounded-full p-1', { 'hover:bg-slate-200': !disableDown })}
				on:click={() => {
					let nextVideo = videoList.findIndex((x) => x == currentVideo);
					if (videoList[nextVideo + 1] === undefined) {
						disableDown = true;
					} else {
						disableDown = false;
						goto('/video?v=' + videoList[nextVideo + 1] + '&list=LL');
					}
				}}
			>
				<img src="arrowDownIcon.svg" alt="" />
			</button>
		</div>
	</div>
	<ol class="flex flex-col overflow-auto">
		{#each listOfVideos as video, i}
			<li
				class="grid grid-cols-[2rem_auto] items-center py-1 hover:bg-slate-200 {currentVideo === video.id
					? 'bg-slate-200'
					: ''}"
				on:dragstart={() => {
					currentDrag = i;
				}}
				on:dragover|preventDefault
				on:drop|preventDefault={() => {
					let temp = listOfVideos.splice(currentDrag, 1);
					listOfVideos.splice(i, 0, temp[0]);
					listOfVideos = listOfVideos;
				}}
				draggable="true"
			>
				{#if currentVideo === video.id}
					<p class="mx-2 text-center text-xs">▶</p>
				{:else}
					<p class="mx-2 text-center text-xs">{i}</p>
				{/if}
				<RecommendedVideoCard {video} params={'&list=LL'} />
			</li>
		{/each}
	</ol>
</div>
