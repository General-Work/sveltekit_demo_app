<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';

	onMount(() => {
		goto('/private');
	});
</script>

<div class="w-full h-screen grid justify-center items-center">
	<Icon icon="svg-spinners:3-dots-move" class="text-blue-600" style="font-size: 80px" />
</div>
