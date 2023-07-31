<script lang="ts">
	import Icon from '@iconify/svelte';

	export let currentPage: number;
	export let hasNextPage: boolean;
	export let hasPreviousPage: boolean;
	export let onNextPage: () => void;
	export let onPreviousPage: () => void;
	export let totalPages: number;
	export let spreadWide = true;
	export let hideLabels = false;
</script>

<div class="flex w-full items-center text-gray-600" class:justify-between={spreadWide} class:gap-3={!spreadWide}>
	<button
		class="flex items-center justify-center gap-1 text-sm font-semibold p-2"
		on:click={onPreviousPage}
		disabled={!hasPreviousPage}
		class:active={hasPreviousPage}
	>
		<Icon icon="material-symbols:arrow-back" style="font-size: 18px" />
		{#if !hideLabels}
			<span>PREV</span>
		{/if}
	</button>
	<div class="text-sm font-semibold">
		<span>PAGE {currentPage}/{totalPages}</span>
	</div>
	<button
		class="flex items-center justify-center gap-1 text-sm font-semibold p-2"
		on:click={onNextPage}
		disabled={!hasNextPage}
		class:active={hasNextPage}
	>
		{#if !hideLabels}
			<span>NEXT</span>
		{/if}
		<Icon icon="material-symbols:arrow-forward" style="font-size: 18px" />
	</button>
</div>

<style lang="scss">
	.active {
		@apply hover:bg-gray-200 rounded-md;
	}
</style>
