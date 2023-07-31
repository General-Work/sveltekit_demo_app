<script>
	export let otherClasses = '';
</script>

<div
	class="w-full bg-white rounded-lg dark:bg-dark-card shadow-sm shadow-gray-200 border {otherClasses}"
>
	<slot />
</div>
