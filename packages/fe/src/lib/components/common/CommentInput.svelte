<script lang="ts">
	import { commentedVideo, showLoginStore } from '$lib/stores';
	import { createEventDispatcher } from 'svelte';
	import { page } from '$app/stores';
	import { clsx } from 'clsx';
	import type { User } from '$lib/types';

	const dispatch = createEventDispatcher();

	export let edit: boolean = false;
	export let keepOpen: boolean = false;
	export let comment: string = '';
	export let user: User;

	console.log('22', user);

	let opened: boolean = keepOpen;
</script>

<div class="flex gap-3 align-middle">
	<img src={user.image} class="h-[2.5rem] w-[2.5rem] rounded-full" alt="" />
	<form class="grow">
		<input
			type="text"
			placeholder="Add a comment..."
			class="w-full border-b-[.1rem] border-slate-300 placeholder-gray-700 focus:border-black"
			on:click={() => {
				if (keepOpen) return;
				if (opened !== true) opened = !opened;
			}}
			bind:value={comment}
		/>
		<div class="mt-2 flex w-full grow gap-4" class:hidden={!opened}>
			<button class="mr-auto rounded-full p-2 hover:bg-slate-200">
				<img src="emojiIcon.svg" alt="" class="h-[1.3rem]" />
			</button>
			<button
				type="button"
				class="rounded-full px-3 py-2 text-sm font-medium hover:bg-slate-200"
				on:click={() => {
					dispatch('cancel');
					if (keepOpen) return;
					opened = !opened;
					comment = '';
				}}>Cancel</button
			>
			<button
				type="button"
				class={clsx('rounded-full px-3 py-2 text-sm font-medium', {
					'cursor-default bg-gray-200 text-slate-500': !comment,
					'bg-blue-600 text-white': comment,
				})}
				on:click={() => {
					if (user.id === 0) {
						$showLoginStore = true;
						return;
					}
					let newComment = {
						id: Math.floor(Math.random() * 5000),
						videoId: Number($page.url.searchParams.get('v')) ?? 0,
						comment,
					};
					if (!edit) {
						$commentedVideo = [...$commentedVideo, newComment];
					}
					dispatch('comment', {
						id: newComment.id,
						comment,
					});
					comment = '';
				}}>{edit ? 'Save' : 'Comment'}</button
			>
		</div>
	</form>
</div>
