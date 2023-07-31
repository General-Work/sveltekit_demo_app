<script lang="ts" context="module">
	export interface IMenu {
		label: string;
		path?: string;
		icon: string | IconifyIcon;
		iconColor: string;
		child?: IMenu[];
	}
</script>

<script lang="ts">
	import {
		Sidebar,
		SidebarWrapper,
		SidebarBrand,
		SidebarItem,
		SidebarGroup,
		SidebarDropdownWrapper,
		SidebarDropdownItem
	} from 'flowbite-svelte';
	// import ec_logo from '../lib/images/ec_logo.png';
	import Icon, { type IconifyIcon } from '@iconify/svelte';
	import { page } from '$app/stores';

	export let menus: IMenu[] = [];

	$: isActivePage = $page.route.id;

	let site = {
		name: 'SvelteKit Demo',
		href: '/',
		img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/1702px-Svelte_Logo.svg.png'
	};
</script>

<Sidebar asideClass="hidden lg:block w-64 h-full border-r">
	<SidebarWrapper divClass=" h-full py-2">
		<SidebarGroup ulClass="space-y-3 ">
			<SidebarBrand
				{site}
				aClass="flex items-center gap-3 m-5 justify-center"
				imgClass="h-6 sm:h-10"
			/>
			{#if menus.length}
				{#each menus as { label, icon, path, iconColor, child }}
					{#if !child}
						<SidebarItem
							href={path}
							{label}
							class="pl-6"
							aClass="flex items-center gap-2 p-2 text-gray-500 hover:bg-gray-100/50 border-l-4 border-transparent "
							activeClass="flex items-center gap-2 p-2  font-medium bg-gray-100 border-l-4 border-[#2882A9] text-black"
							active={path === isActivePage}
						>
							<svelte:fragment slot="icon">
								<Icon
									{icon}
									style="font-size: 21px"
									class={path === isActivePage ? iconColor : 'text-gray-500'}
								/>
							</svelte:fragment>
						</SidebarItem>
					{:else}
						<SidebarDropdownWrapper
							{label}
							class="pl-6"
							btnClass="flex w-full items-center gap-2 p-2 text-gray-500 hover:bg-gray-100/50 border-l-4 border-transparent"
						>
							<svelte:fragment slot="icon">
								<Icon
									{icon}
									style="font-size: 21px"
									class={path === isActivePage ? iconColor : 'text-gray-500'}
								/>
							</svelte:fragment>
							<svelte:fragment slot="arrowup">
								<Icon icon="ei:arrow-up" style="font-size: 21px" />
							</svelte:fragment>
							<svelte:fragment slot="arrowdown">
								<Icon icon="ei:arrow-down" style="font-size: 21px" />
							</svelte:fragment>
							{#each child as item}
								<SidebarDropdownItem label={item.label} />
							{/each}
						</SidebarDropdownWrapper>
					{/if}
				{/each}
			{/if}
		</SidebarGroup>
	</SidebarWrapper>
</Sidebar>
