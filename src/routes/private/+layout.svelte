<script lang="ts">
	import { sideBarMenus } from '$lib/helpers';

	import Sidebar, { type IMenu } from '../../components/Sidebar.svelte';
	import NavBar from '../../components/NavBar.svelte';
	import BreadCrumbs from '../../components/BreadCrumbs.svelte';
	import Icon from '@iconify/svelte';
	import { activePage } from '../../lib/stores/layoutStore';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import dayjs from 'dayjs';

	const menus: IMenu[] = sideBarMenus;

	$: page = $activePage;

	function navigate({ detail }: any) {
		const { index } = detail;
		$activePage = {
			...$activePage,
			currentPage: index
		};
	}
</script>

<div class="w-screen h-screen overflow-hidden">
	<div class="flex h-full w-full">
		<div>
			<Sidebar {menus} />
		</div>
		<div class="flex-grow flex flex-col w-full">
			<NavBar {menus} />
			<div class=" h-full py-6 px-2 md:px-6">
				<div class="flex justify-between items-center mb-5 border-b pb-1">
					<div class="flex items-center gap-1">
						<Icon icon={page.icon} class={page.iconColor} style="font-size: larger;" />
						<BreadCrumbs
							options={page.labels}
							uppercase={false}
							textSmall={false}
							hideBorder
							on:navigate={navigate}
						/>
					</div>
          
					<div class="flex items-center gap-4">
            <span class="font-medium uppercase">{dayjs().format('MMMM DD, YYYY')}</span>  
          
						{#if page.buttons}
							{#each page.buttons as btn}
								<button
									class="flex items-center justify-center gap-1.5 hover:bg-blue-300 rounded-[5px] px-2 py-1.5 bg-blue-200 "
									on:click={btn.onClick}
								>
									{#if btn.icon}
										<Icon
											icon={btn.icon}
											class="{btn.iconColor} rounded-full text-lg bg-gray-100"
										/>
									{/if}
									<span class=" text-gray-600 font-medium text-sm">{btn.label}</span>
								</button>
							{/each}
						{/if}
					</div>
				</div>
				<div class=" h-full overflow-y-auto w-full pb-10">
					<slot />
				</div>
			</div>
		</div>
	</div>
</div>
