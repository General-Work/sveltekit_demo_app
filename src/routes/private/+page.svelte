<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	// import { isAuthenticated, getUser } from '../../lib/stores/authStore';
	// import Icon from '@iconify/svelte';

	onMount(() => {
		// if (getUser()) {
			goto('/private/dashboard');
		// }
	});
</script>