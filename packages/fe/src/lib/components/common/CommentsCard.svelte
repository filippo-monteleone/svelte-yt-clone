<script lang="ts">
	import { myClickOutside } from '$lib/hooks/useClickOutside';
	import { createEventDispatcher } from 'svelte';
	import { commentedVideo } from '$lib/stores';
	import CommentInput from './CommentInput.svelte';

	interface User {
		id: number;
		image: string;
		username: string;
	}

	interface Post {
		id: number;
		body: string;
		reactions: number;
	}

	export let user: User;
	export let post: Post;
	export let isComment: boolean = false;
	export let myComment: boolean = false;
	const dispatch = createEventDispatcher();
	let showDialog: boolean = false;
	let showMore: boolean = false;
	let editingText: boolean = false;

	function deleteComment() {
		dispatch('delete', { id: post.id });
	}

	function editComment() {
		editingText = true;
	}
</script>

<div>
	<div
		class="flex w-full cursor-default gap-4"
		class:hidden={editingText}
		on:mouseenter={() => {
			showMore = true;
		}}
		on:mouseleave={() => {
			showMore = false;
		}}
		role="button"
		tabindex="0"
	>
		<img src={user.image} class="h-[2.5rem] w-[2.5rem] rounded-full" alt="" />
		<div>
			<div class="flex gap-1 text-sm">
				<h1 class="font-medium">{user.username}</h1>
				<span class="text-gray-600">12 hours ago</span>
			</div>
			<p class="cursor-text text-sm">
				{post.body}
			</p>
			<div class="flex gap-2">
				<div class="flex items-center text-xs">
					<button class="rounded-full p-1 text-xs hover:bg-gray-200">
						<img src="/likeIcon.svg" alt="" />
					</button>
					<p>{post.reactions}</p>
				</div>

				<button class="rounded-full p-1 text-xs hover:bg-gray-200">
					<img src="/dislikeIcon.svg" alt="" />
				</button>
				<button class="rounded-full p-1 text-xs hover:bg-gray-200">
					{#if isComment}
						<p class="px-2 font-medium">Reply</p>
					{:else}
						<img src="/commentIcon.svg" alt="" />
					{/if}
				</button>
			</div>
		</div>

		<button
			class="relative ml-auto"
			class:hidden={!showMore && !showDialog}
			on:click={() => {
				showDialog = !showDialog;
			}}
		>
			<img class="ms-auto" src="moreIconH.svg" alt="" />
			<div
				class="absolute z-10 w-[8rem] rounded-lg bg-white py-3 text-sm shadow-2xl"
				class:hidden={!showDialog}
				use:myClickOutside
				on:click_outside={() => {
					showDialog = false;
				}}
			>
				{#if myComment}
					<button class="flex w-full py-1 ps-3 hover:bg-slate-300" on:click={editComment}>
						<img src="editIcon.svg" alt="" class="me-3" />
						<p>Edit</p>
					</button>
					<button class="flex w-full py-1 ps-3 hover:bg-slate-300" on:click={deleteComment}>
						<img src="deleteIcon.svg" alt="" class="me-3" />
						<p>Delete</p>
					</button>
				{:else}
					<button class="flex w-full py-1 ps-3 hover:bg-slate-300">
						<img src="reportIcon.svg" alt="" class="me-3" />
						<p>Report</p>
					</button>
				{/if}
			</div>
		</button>
	</div>
	<div class:hidden={!editingText}>
		<CommentInput
			edit={true}
			keepOpen={true}
			comment={post.body}
			{user}
			on:cancel={() => {
				editingText = false;
			}}
			on:comment={(e) => {
				let changedComment = $commentedVideo.find((x) => x.id === post.id);
				if (changedComment) {
					changedComment.comment = e.detail.comment;
				}
				$commentedVideo = $commentedVideo;
				editingText = false;
			}}
		/>
	</div>
</div>
