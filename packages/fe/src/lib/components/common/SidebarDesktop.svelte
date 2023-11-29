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

<div class="sticky left-0 top-0 mt-3 flex flex-col bg-white px-2 text-center">
	{#each nav as { icon, iconBlack, title, to }}
		<a
			href={to}
			class={clsx('flex flex-col items-center rounded-lg p-2 hover:bg-gray-100', {
				'bg-slate-200 font-semibold hover:bg-slate-300': to === $page.route.id,
			})}
		>
			<img src={`/${to === $page.route.id ? iconBlack : icon}.svg`} alt="" />
			<p class="hidden whitespace-nowrap px-2 sm:block">{title}</p>
		</a>
	{/each}
</div>
