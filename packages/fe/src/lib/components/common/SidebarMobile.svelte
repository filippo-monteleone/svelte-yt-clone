<script lang="ts">
	import { page } from '$app/stores';
	import { clsx } from 'clsx';
	const nav = [
		{
			icon: 'homeIcon',
			title: 'home',
			iconBlack: 'homeBlackIcon',
			to: '/',
		},
		{
			icon: 'subIcon',
			iconBlack: 'subIconBlack',
			title: 'subscription',
			to: '/subs',
		},
		{
			icon: 'likeIcon',
			iconBlack: 'likeBlackIcon',
			title: 'Liked videos',
			to: '/liked',
		},
	];
</script>

<div class="absolute bottom-0 z-50 flex w-full justify-center border-t-2 bg-white text-center">
	<div class="mt-2 grid grid-cols-3">
		{#each nav as { icon, iconBlack, title, to }}
			<a
				href={to}
				class={clsx('flex flex-col items-center rounded-lg p-2 hover:bg-gray-100', {
					'bg-slate-200 font-semibold': to === $page.route.id,
				})}
			>
				<img src={`/${to === $page.route.id ? iconBlack : icon}.svg`} alt="" />
				<p class="hidden whitespace-nowrap px-2 sm:block">{title}</p>
			</a>
		{/each}
	</div>
</div>
