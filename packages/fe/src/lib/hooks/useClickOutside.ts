import type { ActionReturn } from 'svelte/action';

export const clickOutside = (node: HTMLElement, cb: () => void): ActionReturn<() => void> => {
	const onClick = (event: MouseEvent) => {
		if (node && !node.contains(event.target as HTMLElement) && !event.defaultPrevented) cb();
		console.log(node.contains(event.target as HTMLElement), event.defaultPrevented);
	};

	document.addEventListener('click', onClick, true);

	return {
		destroy() {
			document.removeEventListener('click', onClick, true);
		},
	};
};

export const myClickOutside = (node: HTMLElement) => {
	const isClickInside = (event: MouseEvent) => {
		if (!node.contains(event.target as HTMLElement)) {
			node.dispatchEvent(new CustomEvent('click_outside'));
		}
	};

	document.addEventListener('click', isClickInside, true);

	return {
		destroy() {
			document.removeEventListener('click', isClickInside, true);
		},
	};
};
