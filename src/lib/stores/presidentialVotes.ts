import { writable, derived } from 'svelte/store';

export const isCurrentPage = writable(1);
export const pageLength = writable(5);
export const totalResults = writable(0);
export const totalPageLength = derived([totalResults, pageLength], ([$totalItems, $pageLength]) =>
	Math.ceil($totalItems / $pageLength)
);
export const goToPrevPage = () => {
	isCurrentPage.update((value) => Math.max(value - 1, 1));
};

export const goToNextPage = () => {
	isCurrentPage.update((value) => Math.min(value + 1));
};
