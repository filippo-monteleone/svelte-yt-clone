<script lang="ts">
	import type { PageData } from './$types';

	import VideoCard from '$lib/components/common/VideoCard.svelte';

	export let data: PageData;
</script>

<div class="grid justify-items-center gap-5">
	{#each data.videos as video}
		<VideoCard {video} />
	{/each}
</div>

<style>
	.grid {
		grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
	}
</style>
