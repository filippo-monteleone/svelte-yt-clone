<script lang="ts">
	import type { PageData } from './$types';
	import RecommendedVideoCard from '$lib/components/common/RecommendedVideoCard.svelte';
	export let data: PageData;
</script>

<div class="flex flex-col gap-4">
	{#each data.videos as video, i}
		<div class="flex items-center" draggable>
			<p class="px-3 text-sm font-medium text-slate-600">{i}</p>
			<RecommendedVideoCard {video} params={'&list=LL'} inlineDetails={true} small={true} />
		</div>
	{/each}
</div>
