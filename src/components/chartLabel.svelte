<script lang="ts">
	export let color = '';
	export let label = '';
	export let count = '';
</script>

<div class="flex items-center gap-2">
	<svg
		width="12"
		class="{color}"
		viewBox="0 0 13 14"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle cx="6.5" cy="7" r="6.5" fill="currentColor" />
	</svg>
	<div class="">
		<h6 class="mb-0">{label}</h6>
		<span class="text-secondary-600">{count}</span>
	</div>
</div>
