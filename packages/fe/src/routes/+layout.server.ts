import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals, cookies }) => {
	let user;
	try {
		user = JSON.parse(cookies.get('user') ?? '');
		user = await fetch(`https://dummyjson.com/users/filter?key=username&value=${user.username}`)
			.then((res) => res.json())
			.then((res) => res.users[0]);
	} catch {
		user = { id: 0, image: 'signInIcon.svg' };
	}

	return {
		user,
		locale: locals.locale,
	};
}) satisfies LayoutServerLoad;
