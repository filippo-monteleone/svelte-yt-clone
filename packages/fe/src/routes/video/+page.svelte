<script lang="ts">
	import ChannelCard from '$lib/components/common/ChannelCard.svelte';
	import CommentInput from '$lib/components/common/CommentInput.svelte';
	import CommentsCard from '$lib/components/common/CommentsCard.svelte';
	import VideoDescription from '$lib/components/routes-component/VideoDescription.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { commentedVideo, likedVideos } from '$lib/stores';
	import type { PageData } from './$types';
	import type { User } from '$lib/types';
	import RecommendedVideoCard from '$lib/components/common/RecommendedVideoCard.svelte';
	import VideoList from '$lib/components/routes-component/VideoList.svelte';
	import { me } from '$lib/stores';
	import { fade } from 'svelte/transition';

	export let data: PageData;

	$: myComments = $commentedVideo
		.filter((x) => x.videoId === Number($page.url.searchParams.get('v')))
		.map((x) => ({
			id: x.id,
			body: x.comment,
			reactions: 0,
			user: $me,
		}));

	$: video = data.video;
	$: comments = [...myComments, ...data.comments];
	$: totalComments = data.totalComments + myComments.length;
	$: featuredVideos = data.featuredVideos.filter((x) => x.id !== Number($page.url.searchParams.get('v')));
	$: liked = !!$likedVideos.find((x) => x === video?.id);

	let end: HTMLElement;
	let showDelete: boolean = false;
	let itemToDelete: number;

	onMount(() => {
		const observer = new IntersectionObserver(async (entries) => {
			if (entries[0].isIntersecting) {
				if (data.totalComments === comments.length) return;
				console.log('Carica altri messaggi');
				let newComments = await fetch(
					`https://dummyjson.com/comments/post/${$page.url.searchParams.get('v')}?limit=2&skip=${
						comments.length
					}`
				)
					.then((req) => req.json())
					.then((req) => req.comments);

				const users: User[] = [];

				const getUsers = async (id: number) => {
					const user = await fetch(`https://dummyjson.com/users/${id}`).then((req) => req.json());
					users.push(user);
				};

				await Promise.all(newComments.map((x: Comment) => getUsers(x.user.id)));

				newComments = newComments.map((x: Comment, i: number) => ({
					body: x.body,
					reactions: Math.floor(Math.random() * 5000),
					user: users[i],
				}));

				comments = [...comments, ...newComments];
			}
		});
		observer.observe(end);
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="fixed left-0 top-0 z-50 flex h-screen w-screen bg-slate-500/20"
	class:hidden={!showDelete}
	on:click|self={() => {
		showDelete = false;
	}}
>
	<div class="m-auto flex flex-col rounded-xl bg-white p-5 text-sm shadow-xl">
		<h1 class="font-medium">Delete Comment</h1>
		<p class="mb-4 mt-3 pr-3 text-gray-600">Delete your comment permanently?</p>
		<div class="flex gap-3">
			<button
				class="ml-auto rounded-full px-3 py-2 font-medium text-blue-600 hover:bg-sky-100"
				on:click={() => {
					showDelete = false;
				}}>Cancel</button
			>
			<button
				class="rounded-full px-3 py-2 font-medium text-blue-600 hover:bg-sky-100"
				on:click={() => {
					showDelete = false;
					$commentedVideo = $commentedVideo.filter((x) => x.id !== itemToDelete);
					itemToDelete = -1;
				}}>Delete</button
			>
		</div>
	</div>
</div>

<div class="flex flex-col gap-5 lg:flex-row">
	<div class="flex w-full flex-col lg:w-8/12">
		<video class="aspect-auto rounded-2xl" controls src={video?.sources[0]}>
			<track kind="captions" />
		</video>
		<div class="mb-3 mt-2 flex flex-col">
			<div class="text-xl font-semibold">{video?.title}</div>
			<div class="grid grid-cols-4 items-center">
				<ChannelCard channel={data.channel} small={true} />
				<div class="col-start-3 flex divide-x-2 rounded-full bg-gray-100">
					<button
						class="flex items-center px-4 py-2"
						on:click={() => {
							if ($likedVideos.find((x) => x === video?.id)) {
								$likedVideos = $likedVideos.filter((x) => x !== video?.id);
							} else {
								$likedVideos = [video?.id ?? 0, ...$likedVideos];
							}
						}}
					>
						<img src="{liked ? 'likeBlackIcon.svg' : 'likeIcon.svg'} " alt="" />
						<span class="ps-2 text-sm font-medium"> 3000 </span>
					</button>
					<button class="px-4 py-2">
						<img src="dislikeIcon.svg" alt="" />
					</button>
				</div>
				<button class="flex gap-2 rounded-full px-4 py-2 hover:bg-gray-200">
					<img src="shareIcon.svg" alt="" />
					<span class="text-sm font-medium">share</span>
				</button>
				<button class="flex gap-2 justify-self-stretch rounded-full px-4 py-2 hover:bg-gray-200">
					<img src="moreIcon.svg" alt="" />
				</button>
			</div>
		</div>
		<VideoDescription description={video?.description ?? 'No Description'} />
		<h2 class="py-3 text-lg font-bold">{totalComments} Comments</h2>
		<CommentInput
			user={$me}
			on:comment={(event) => {
				let comment = {
					id: event.detail.id,
					body: event.detail.comment,
					reactions: 0,
					user: $me,
				};
				comments = [comment, ...comments];
			}}
		/>
		<div class="mt-6">
			{#each comments as comment (comment)}
				<div transition:fade>
					<CommentsCard
						user={{ id: comment.user.id, username: comment.user.username, image: comment.user.image }}
						post={{ id: comment.id, body: comment.body, reactions: comment.reactions }}
						isComment={true}
						myComment={comment.user.id === $me.id}
						on:delete={(e) => {
							showDelete = true;
							itemToDelete = e.detail.id;
						}}
					/>
				</div>
			{/each}
			<div bind:this={end} class="py-1"></div>
		</div>
	</div>
	<div class="mb-12 flex flex-col gap-2 md:mb-20 lg:mb-0">
		{#if $page.url.searchParams.get('list') == 'LL'}
			{#key video.id}
				<VideoList currentVideo={video.id} videoList={$likedVideos} />
			{/key}
		{/if}
		{#each featuredVideos as video}
			<RecommendedVideoCard {video} small={true} />
		{/each}
	</div>
</div>

<style>
	.grid {
		grid-template-columns: max-content auto max-content max-content max-content;
	}
</style>
