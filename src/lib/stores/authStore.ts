import { writable } from 'svelte/store';

let isClient = true;

interface IUser {
	initials: string;
	email: string;
	id: number;
	fullname: string;
}

const testuser = {
	initials: 'TU',
	email: 'testuser@mail.com',
	id: 1,
	fullname: 'Test User Name'
};

export const login = async (email: string, password: string) => {
	return new Promise((resolve) => {
		if (typeof window !== 'undefined')
			localStorage.setItem('user', JSON.stringify({ email, password }));
		resolve({ success: true });
	});
};

export const logout = () => {
	if (typeof window !== 'undefined') localStorage.removeItem('user');
};

export function getUser(): boolean {
	let token;
	if (typeof window !== 'undefined') token = localStorage.getItem('user');
	if (token) {
		return true;
	} else {
		return false;
	}
}

export const isAuthenticated = getUser();
export const user = writable<IUser>(testuser);
