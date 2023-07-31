import { writable, derived } from 'svelte/store';

export const currentPage = writable(1);
export const pageSize = writable(15);
export const totalItems = writable(0);
export const totalPages = derived([totalItems, pageSize], ([$totalItems, $pageSize]) =>
	Math.ceil($totalItems / $pageSize)
);
export const previousPage = () => {
	currentPage.update((value) => Math.max(value - 1, 1));
};

export const nextPage = () => {
	currentPage.update((value) => Math.min(value + 1));
};
