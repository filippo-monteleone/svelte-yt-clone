import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const posts = await fetch(`https://dummyjson.com/posts/user/${params.user}`).then((req) => req.json());

	return {
		posts: posts.posts,
	};
}) satisfies PageLoad;
