<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Drawer, DropdownDivider } from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';

	export let open = true;
	export let id = 'sidebar';
	export let placement = 'left';
	export let title = '';
	export let width = 400;
	export let close: () => void;
	let transitionParams = {
		x: placement === 'left' ? -320 : 320,
		duration: 200,
		easing: sineIn
	};
</script>

<Drawer
	{placement}
	transitionType="fly"
	{transitionParams}
	bind:hidden={open}
	{id}
	divClass="overflow-y-hidden z-50 py-4 bg-white dark:bg-gray-800"
	width="w-[{width}px]"
  activateClickOutside={false}
  bgOpacity="bg-opacity-30"
>
<div class="flex flex-col h-full">
	<div class="flex justify-between px-2 pb-2">
		<span class="font-medium">{title}</span>
		<button on:click={close}>
			<Icon icon="ic:outline-close" style="font-size: 20px" />
		</button>
	</div>
	<DropdownDivider divClass="my-1 h-px bg-gray-300 dark:bg-gray-600"/>
	<div class="overflow-y-auto p-4 flew-grow">
		<slot />
	</div>
</div>
</Drawer>
