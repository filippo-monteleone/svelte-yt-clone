import type { PageLoad } from './$types';
import { test } from '$lib/data';

export const load = (async ({ fetch }) => {
	const users = await fetch(`https://dummyjson.com/users?limit=${test.length}`)
		.then((res) => res.json())
		.then((res) => res.users);

	return {
		videos: test.map((x, i) => ({
			id: x.id,
			sources: x.sources,
			thumb: x.thumb,
			description: '',
			subtitle: '',
			title: x.title,
			views: Math.floor(Math.random() * 50000),
			user: users[i],
		})),
	};
}) satisfies PageLoad;
