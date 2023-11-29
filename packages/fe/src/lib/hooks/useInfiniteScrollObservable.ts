import type { ActionReturn } from 'svelte/action';
import { get, type Writable } from 'svelte/store';

type InfiniteScrollObservableProps = {
	loadingElem?: string;
	currentItems: Writable<number>;
	totalItems: Writable<number>;
	cb: Writable<() => void>;
};

let observerInstance: IntersectionObserver;

export const infiniteScrollObservable = (
	node: HTMLElement,
	{ loadingElem, currentItems, totalItems, cb }: InfiniteScrollObservableProps
): ActionReturn<InfiniteScrollObservableProps> => {
	const createObserver = () => {
		if (observerInstance) return;

		observerInstance = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const loadMore = get(currentItems) < get(totalItems);

					if (!loadMore || !entry.isIntersecting) return;

					get(cb)();
				});
			},
			{
				root: node,
				rootMargin: '0px',
				threshold: 0,
			}
		);
	};
	createObserver();

	const loadingEl = Array.from(node.children).find((child) => child.id === loadingElem ?? 'loading-elem');

	if (!loadingEl) {
		console.error('Loading element not found');
		return {
			destroy: () => {},
		};
	}

	observerInstance.observe(loadingEl);

	return {
		destroy: () => {
			if (!loadingEl) return;

			observerInstance.unobserve(loadingEl);
		},
	};
};
