import { detectLocale } from '$lib/i18n/i18n-util.js';
import { sequence } from '@sveltejs/kit/hooks';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';

import type { Handle } from '@sveltejs/kit';
const handleLocaleDetection = (async ({ event, resolve }) => {
	const detectAcceptLang = initAcceptLanguageHeaderDetector(event.request);
	const locale = detectLocale(detectAcceptLang);

	event.locals.locale = locale;

	return resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', locale) });
}) satisfies Handle;

export const handle = sequence(handleLocaleDetection);
