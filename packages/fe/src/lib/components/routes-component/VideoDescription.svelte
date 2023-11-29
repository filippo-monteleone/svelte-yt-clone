<script lang="ts">
	let expand: boolean = false;
	let showMore: boolean = false;
	export let description: string;

	const checkHeight = (node: HTMLElement) => {
		if (node.scrollHeight > node.clientHeight) showMore = true;
		console.log(node.scrollHeight, node.clientHeight);
	};
</script>

<div class="relative overflow-hidden rounded-xl bg-gray-200 p-2 text-sm">
	<div class="mb-2 font-medium">
		<span>10,000 views Sep 26, 2023</span>
	</div>
	<p class="mb-5" class:line-clamp-2={!expand} use:checkHeight>
		{description}
	</p>
	<button
		class:hidden={!showMore}
		class="absolute bottom-0 right-0 w-[5rem] bg-gradient-to-l from-gray-200 from-80% pe-2 text-end font-medium"
		on:click={() => {
			expand = !expand;
		}}>{expand ? 'Show less' : '...more'}</button
	>
</div>
