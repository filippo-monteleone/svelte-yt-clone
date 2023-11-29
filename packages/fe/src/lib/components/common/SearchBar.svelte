<script lang="ts">
	export let mobile: boolean = false;
</script>

<form class="flex {mobile ? 'grow' : 'w-[30rem]'}">
	<input
		class="focus:border-blue h-[3rem] flex-1 {mobile
			? 'rounded-full'
			: 'rounded-s-3xl'} border border-gray-400 outline-none focus:border-2 focus:border-blue-600"
		type="text"
	/>
	<button class="rounded-e-3xl border bg-slate-50 px-3" class:hidden={mobile}>
		<img src="/searchIcon.svg" alt="" />
	</button>
</form>
