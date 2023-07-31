<script lang="ts">
	import Icon from '@iconify/svelte';

	export let placeholder = '';
	export let value = '';
</script>

<section class="bg-gray-200/70 rounded-md flex items-center gap-2 px-3 py-2">
	<Icon icon="eva:search-outline" class="text-xl text-gray-500" />
	<input
		bind:value
		class="outline-none px-2 border-none bg-transparent placeholder:text-sm text-sm w-full"
		{placeholder}
	/>
</section>
