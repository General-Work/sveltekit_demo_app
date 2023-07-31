<script lang="ts">
	import Icon, { type IconifyIcon } from '@iconify/svelte';

	export let isLoading = false;
	export let label: string = '';
	export let count: any = 0;
	export let color: string = '';
	export let smallIcon = '';
	export let bigIcon = '';
	export let bigIconSize = 120;
	export let smallIconSize = 28;
</script>

<div
	class="relative pl-6 pr-8 py-6 rounded-lg"
	class:bg-[#B79BFF]={color === 'blue'}
	class:bg-[#A6F7E2]={color === 'green'}
	class:bg-[#FFE5A5]={color === 'yellow'}
	class:bg-[#ffa5c0]={color === 'red'}
>
	<div class="flex items-center gap-4 justify-between">
		<div class="flex flex-col gap-1">
			{#if isLoading}
				<div class="animate-pulse flex flex-col gap-2 py-2">
					<div class="w-32 h-4 bg-gray-300 rounded-md" />
					<div class="w-20 h-4 bg-gray-300 rounded-md" />
				</div>
			{:else}
				<span class="text-black">{label}</span>
				<p class="text-black text-2xl font-semibold">
					{count}
				</p>
			{/if}
		</div>
		<div class="relative">
			<div class="absolute -right-9 -top-[36px]">
				<div class="opacity-5 text-gray-700">
					<Icon icon={bigIcon} style="font-size: {bigIconSize}px" />
				</div>
			</div>
			<div
				class="relative bg-white p-2 rounded-md"
				class:text-[#79b1a2]={color === 'green'}
				class:text-[#B79BFF]={color === 'blue'}
				class:text-[#ccb887]={color === 'yellow'}
				class:text-[#ffa5c0]={color === 'red'}
			>
				<Icon icon={smallIcon} style="font-size: {smallIconSize}px" />
			</div>
		</div>
	</div>
</div>
