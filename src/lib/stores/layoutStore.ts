import { writable } from 'svelte/store';
interface INavBarDetails {
	label: string;
	color: string;
}
interface breadCrumbs {
	id: number;
	label: string;
}

interface actionButton {
	icon?: string;
	label: string;
	iconColor?: string;
	onClick?: () => void;
}
interface IActivePage {
	icon: string;
	iconColor: string;
	labels: breadCrumbs[];
	buttons?: actionButton[];
	currentPage?: number;
}
export const navBarHeader = writable<INavBarDetails>({ label: '', color: '' });
export const activePage = writable<IActivePage>({
	labels: [{ id: 0, label: '' }],
	icon: '',
	iconColor: ''
});

export const removeScanPage = () => {
	activePage.update((value) => {
		// if (value.currentPage || value.currentPage === 0) {
		return {
			...value,
			labels:
				value.currentPage === 0
					? value.labels.slice(0, value.currentPage + 1)
					: value.labels.slice(0, value.currentPage),
			currentPage: 0
		};
		// }
	});
};
export const addScanPage = () => {
	activePage.update((value) => {
		return {
			...value,
			labels: [...value.labels, { id: 2, label: 'Scan Pink Sheet' }],
			currentPage: 1
		};
	});
};
