import { loadLocaleAsync } from '$lib/i18n/i18n-util.async';
import { me } from '$lib/stores';

import type { LayoutLoad } from './$types';

export const load = (async (event) => {
	const { locale, user } = event.data;
	await loadLocaleAsync(locale);

	me.set(user);

	return event.data;
}) satisfies LayoutLoad;
