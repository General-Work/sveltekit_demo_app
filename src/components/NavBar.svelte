<script lang="ts">
	import {
		Navbar,
		NavLi,
		NavUl,
		NavHamburger,
		Avatar,
		Dropdown,
		DropdownItem,
		DropdownHeader
	} from 'flowbite-svelte';
	import { navBarHeader } from '../lib/stores/layoutStore';
	import { user, logout } from '../lib/stores/authStore';
	import { goto } from '$app/navigation';
	import type { IMenu } from './Sidebar.svelte';
	import { page } from '$app/stores';

	export let menus: IMenu[] = [];

	$: person = $user;
	$: header = $navBarHeader;
	$: isActivePage = $page.route.id;

	function signOut() {
		logout();
		goto('/auth');
	}
</script>
<Navbar let:hidden let:toggle class="border-b border-gray-200">
	<div>
		<span class="font-medium {header.color}">{header.label}</span>
	</div>
	<div class="flex items-center md:order-2">
		<div class="flex items-center gap-4">
			<span class="hidden md:block font-semibold uppercase text-sm text-[#2882A9]"
				>{person.fullname}</span
			>
			<Avatar
				id="avatar-menu"
				size="sm"
				class="bg-[#2882A9] text-white font-medium cursor-pointer text-sm">{person.initials}</Avatar
			>
		</div>
		<NavHamburger on:click={toggle} class1="w-full md:flex md:w-auto md:order-1" />
	</div>
	<Dropdown placement="bottom" triggeredBy="#avatar-menu">
		<DropdownHeader>
			<span class="block text-sm"> {person.fullname}</span>
			<span class="block truncate text-sm font-medium"> {person.email} </span>
		</DropdownHeader>
		<DropdownItem on:click={signOut}>Sign out</DropdownItem>
	</Dropdown>
	<NavUl {hidden} divClass="w-full lg:hidden ">
		{#if menus.length}
			{#each menus as item}
				<NavLi active={item.path === isActivePage} href={item.path}>{item.label}</NavLi>
			{/each}
		{/if}
	</NavUl>
</Navbar>
