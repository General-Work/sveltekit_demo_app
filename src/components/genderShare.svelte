<script lang="ts">
	import ChartLabel from './chartLabel.svelte';
	import Echart from './echart.svelte';
	export let chartData: any[] = [];

	$: options = {
		tooltip: {
			trigger: 'item'
		},
		color: ['#727792', '#FD9D67'],
		series: [
			{
				type: 'pie',
				radius: ['40%', '70%'],
				avoidLabelOverlap: false,
				itemStyle: {
					borderRadius: 10,
					borderColor: '#fff',
					borderWidth: 10
				},
				label: {
					show: false,
					position: 'center'
				},
				labelLine: {
					show: false
				},

				data: chartData.map((x) => ({ name: x.name, value: x.count }))
			}
		]
	};
</script>

<p class="pl-6 pt-4 text-lg font-medium">Gender Share</p>
<div class=" flex items-center justify-center">
	<Echart {options} />
	<div class="flex flex-col gap-2">
		<ChartLabel label="Male" color="text-[#727792]" />
		<ChartLabel label="Female" color="text-[#FD9D67]" />
	</div>
</div>
