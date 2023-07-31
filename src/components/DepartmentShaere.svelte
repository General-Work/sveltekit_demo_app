<script lang="ts">
	import Echart from './echart.svelte';
	import Box from './Box.svelte';

	export let data: any[] = [];


	$: options = {
		xAxis: {
			type: 'category',
			data: data.map((dept) => dept.name)
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				data: data.map((dept) => dept.staffTotal),
				type: 'bar',
				showBackground: true,
				backgroundStyle: {
					color: 'rgba(180, 180, 180, 0.2)'
				}
			}
		]
	};
</script>

<Box>
	<p class="text-xl font-medium px-6 pt-8">Department Distribution</p>
	<div class="hidden md:block">
		<Echart {options} height={500} width={900} />
	</div>
	<div class="md:hidden">
		<Echart {options} height={500} width={400} />
	</div>
</Box>
