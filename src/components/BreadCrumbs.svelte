<script lang="ts">
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';

	export let options: any[];
	export let uppercase = true;
	export let textSmall = true;
	export let hideBorder = false;

	const dispatch = createEventDispatcher();

	function navigate(index: any, id: any) {
		dispatch('navigate', { index: index, id: id });
	}
</script>

<nav
	class=" border-[#18536C] font-semibold text-[#18536C] flex items-center gap-1"
	class:uppercase
	class:text-sm={textSmall}
	class:border-l-2={!hideBorder}
	class:pl-2={!hideBorder}
>
	<!-- <span class="">MapView</span> -->
	{#each options as opt, i}
		<span
			role="button"
			class=" cursor-pointer {i === options.length - 1 ? 'font-bold' : ''}"
			on:click={() => navigate(i, opt.id)}>{opt.label}</span
		>
		{#if i !== options.length - 1}
			<div class="">
				<Icon icon="ic:outline-greater-than" style="font-size:medium" />
			</div>
		{/if}
	{/each}
</nav>
