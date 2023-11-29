import en from '../en';

import type { BaseTranslation, Translation } from '../i18n-types';

const it = {
	...(en as Translation),
	hello: 'Ciao {name:string}!'
} satisfies BaseTranslation;

export default it;
