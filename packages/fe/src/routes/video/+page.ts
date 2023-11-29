import type { PageLoad } from './$types';
import { test } from '$lib/data';

export const load = (async ({ url }) => {
	const video = test.find((x) => x.id === Number(url.searchParams.get('v'))) ?? {
		id: 0,
		title: 'No Title',
		thumb: '',
		subtitle: '',
		sources: [''],
		description: '',
	};

	const user = await fetch(`https://dummyjson.com/users/${video?.id}`).then((req) => req.json());

	const { comments, total } = await fetch(`https://dummyjson.com/comments/post/${url.searchParams.get('v')}?limit=2`)
		.then((req) => req.json())
		.then((req) => req);

	const users: User[] = [];

	const getUsers = async (id: number) => {
		const user = await fetch(`https://dummyjson.com/users/${id}`).then((req) => req.json());
		users.push(user);
	};

	await Promise.all(comments.map((x: Comment) => getUsers(x.user.id)));

	const channel: Channel = { owner: user, subs: Math.floor(Math.random() * 5000) };

	return {
		video,
		channel,
		comments: comments.map((x: Comment, i: number) => ({
			id: i,
			body: x.body,
			reactions: Math.floor(Math.random() * 5000),
			user: users[i],
		})),
		totalComments: total,
		featuredVideos: test,
	};
}) satisfies PageLoad;
