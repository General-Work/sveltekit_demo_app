<script lang="ts" context="module">
	export interface IActivity {
		title: string;
		startTime: Date;
		startDate: Date;
	}
</script>

<script lang="ts">
	import dayjs from 'dayjs';
	import { send, receive } from '../lib/helpers';
	import { flip } from 'svelte/animate';

	export let activities: IActivity[] = [];
</script>

{#if activities.length}
	{#each activities as { title, startDate, startTime } (title)}
		<div
			class="relative flex pb-2 mb-1 items-top"
			in:receive={{ key: title }}
			out:send={{ key: title }}
			animate:flip
		>
			<div
				class="border border-r rtl:border-l rtl:right-2 rtl:left-0 rtl:mr-0.5 ml-0.5 bg-secondary-100 h-full w-px absolute dark:border-secondary-600 left-2 top-3 z-10"
				aria-hidden="true"
			/>
			<div
				class="w-5 h-5 mt-1 rtl:right-0 bg-white border-2 border-primary-500 dark:bg-dark-card rounded-full z-10"
			/>
			<div class="ml-6 rtl:mr-6 LR">
				<h6 class="mb-1 font-medium text-base">
					{title} -
					<span class="teeventttitleary-500"
						>{dayjs(startDate).format('ddd MMMM DD, YYYY') ?? ''}</span
					>
				</h6>
				<span class="mb-0 text-base text-gray-600"
					>{dayjs(startTime).format('hh : mm A') ?? ''}</span
				>
			</div>
		</div>
	{/each}
{:else}
	<div class="flex justify-center items-center h-96">No Events</div>
{/if}
