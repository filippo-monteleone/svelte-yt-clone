//Faccio get dell'utente
import type { LayoutLoad } from './$types';

export const load = (async ({ params }) => {
	const user = await fetch(`https://dummyjson.com/users/${params.user}`).then((result) => result.json());

	return {
		user,
		videos: Math.floor(Math.random() * 20),
		subs: Math.floor(Math.random() * 50000),
	};
}) satisfies LayoutLoad;
