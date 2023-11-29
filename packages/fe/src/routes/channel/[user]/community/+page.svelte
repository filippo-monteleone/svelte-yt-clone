<script lang="ts">
	import type { PageData } from './$types';
	import CommentsCard from '$lib/components/common/CommentsCard.svelte';
	import type { User } from '$lib/types';
	export let data: PageData;

	let user: User = { id: data.user.id, image: data.user.image, username: data.user.username };
</script>

<div class="mt-10 flex flex-col gap-5">
	{#each data.posts as post}
		<div class="rounded-2xl border border-gray-300 p-2">
			<CommentsCard {user} {post} />
		</div>
	{/each}
</div>
