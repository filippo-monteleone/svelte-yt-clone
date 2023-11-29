<script lang="ts">
	import { sineInOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	// eslint-disable-next-line no-undef
	export let video: Video;
	export let date: string = '2023-8-10';
	let releaseDate: Date = new Date(date);
	let today: Date = new Date();

	const progress = tweened(0, {
		duration: 100,
		easing: sineInOut,
	});
	let timeoutId: number = 0;
	let intervalId: number = 0;
	let showVideo: boolean = false;

	let videoTag: HTMLVideoElement;
	let progressBar: HTMLProgressElement;
	$: time = '0';
	console.log('11', video);
</script>

<a href="/video?v={video.id}" class="flex w-full flex-col">
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		id="video"
		class="relative"
		on:mouseenter={() => {
			timeoutId = setTimeout(() => {
				videoTag.muted = true;
				videoTag.play();
				showVideo = true;
				intervalId = setInterval(() => {
					progress.set($progress + 1);
				}, 100);
			}, 1000);
		}}
		on:mouseleave={() => {
			videoTag.pause();
			videoTag.currentTime = 0;
			clearInterval(intervalId);
			clearTimeout(timeoutId);
			showVideo = false;
			progress.set(0);
		}}
	>
		<div
			class="absolute bottom-2 right-4 rounded-md bg-black/80 p-[0.1em] font-medium text-white"
			class:hidden={showVideo}
		>
			{time}
		</div>
		<div
			class="absolute right-4 top-2 z-50 flex divide-x-2 divide-gray-400/80 bg-black/80"
			class:hidden={!showVideo}
		>
			<button
				on:click|preventDefault={() => {
					videoTag.muted = !videoTag.muted;
				}}
			>
				<img src="muteIcon.svg" alt="" />
			</button>
			<button>
				<img src="capIcon.svg" alt="" />
			</button>
		</div>
		<img
			src={video.thumb}
			alt=""
			class="h-[13rem] w-full rounded-2xl object-cover hover:rounded-none"
			class:hidden={showVideo}
		/>
		<video
			src={video.sources[0]}
			class:hidden={!showVideo}
			preload="metadata"
			class="h-[13rem] w-full object-cover"
			bind:this={videoTag}
			on:loadedmetadata={() => {
				const min = Math.floor(videoTag.duration / 60);
				const sec = Math.floor(videoTag.duration - min * 60);
				progressBar.max = videoTag.duration * 10;
				time = `${min}:${sec}`;
			}}
		>
			<track kind="captions" />
		</video>
		<progress class="absolute h-1 w-full" value={$progress} bind:this={progressBar}></progress>
	</div>
	<div class="mt-3 flex gap-3">
		<a href="/channel/{video.user.id}">
			<img src={video.user.image} class="h-[2.5rem] rounded-full" alt="" />
		</a>
		<div>
			<h3 class="font-medium capitalize">{video.title}</h3>
			<p class="text-sm text-gray-600">{video.user.username}</p>
			<div class="text-sm text-gray-600">
				<span>{video.views} views</span>
				<span
					>•
					{#if today.getFullYear() - releaseDate.getFullYear() > 0}
						{today.getFullYear() - releaseDate.getFullYear()} year
					{:else if today.getMonth() - releaseDate.getMonth() > 0}
						{today.getMonth() - releaseDate.getMonth()} month
					{:else}
						{today.getDay() - releaseDate.getDay()} day
					{/if}
				</span>
			</div>
		</div>
	</div>
</a>

<style>
	progress {
		display: none;
	}
	#video:hover progress {
		display: block;
	}
	progress::-webkit-progress-bar {
		background-color: gray;
	}
	progress::-webkit-progress-value {
		background-color: red;
	}
</style>
