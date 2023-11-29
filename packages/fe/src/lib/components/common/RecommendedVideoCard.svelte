<script lang="ts">
	import type { Video } from '$lib/types';
	import { clsx } from 'clsx';
	export let video: Video;
	export let inlineDetails: boolean = false;
	export let small: boolean = false;
	export let params: string = '';
</script>

<a href="/video?v={video.id}{params}" class="flex">
	<img
		src={video.thumb}
		alt=""
		class={clsx('me-2 aspect-video object-cover', { 'h-[6rem] rounded-xl': small, 'h-[3rem] rounded-md': !small })}
	/>
	<div class="flex flex-col text-xs text-slate-600">
		<h1 class="mb-1 text-sm font-medium text-black">{video.title}</h1>
		{#if inlineDetails}
			<div class="flex">
				<p>{video.subtitle.replace('By', '')}</p>
				<p class="hidden ps-1 sm:block">• 5000 views • 12 hours ago</p>
			</div>
		{:else}
			<p>{video.subtitle.replace('By', '')}</p>
			<p class:hidden={!small}>5000 views • 12 hours ago</p>
		{/if}
	</div>
</a>
