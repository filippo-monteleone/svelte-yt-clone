import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {};

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const username = data.get('username');

		cookies.set('user', JSON.stringify({ username }));
	},
} satisfies Actions;
