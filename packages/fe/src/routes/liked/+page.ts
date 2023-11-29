import type { PageLoad } from './$types';
import { test } from '$lib/data';
import { likedVideos } from '$lib/stores';
import { get } from 'svelte/store';

export const load = (async () => {
	const videos = get(likedVideos).map((x) => {
		return test.find((y) => y.id === x);
	});

	return {
		videos: videos.map((x) => ({
			description: x?.description ?? '',
			sources: x?.sources ?? [],
			subtitle: x?.subtitle ?? '',
			thumb: x?.thumb ?? '',
			title: x?.title ?? '',
			id: x?.id ?? 0,
		})),
	};
}) satisfies PageLoad;
